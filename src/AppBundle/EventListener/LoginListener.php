<?php
/**
 * Created by PhpStorm.
 * User: lekskazimirchuk
 * Date: 6/28/16
 * Time: 2:16 PM
 */

namespace AppBundle\EventListener;

use ApiBundle\Entity\User;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Doctrine\Bundle\DoctrineBundle\Registry as Doctrine;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

/**
 * Listener responsible to change the redirection at the end of the password resetting
 */
class LoginListener implements AuthenticationSuccessHandlerInterface
{
    private $router;
    private $tokenStorage;
    private $authorizationChecker;
    private $em;

    public function __construct(UrlGeneratorInterface $router, TokenStorage $tokenStorage, AuthorizationChecker $authorizationChecker, Doctrine $doctrine)
    {
        $this->router = $router;
        $this->tokenStorage = $tokenStorage;
        $this->authorizationChecker = $authorizationChecker;
        $this->em = $doctrine->getManager();
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        /** @var User $user */
        $user =$this->tokenStorage->getToken()->getUser();
        if (false === $this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            $response = new RedirectResponse($this->router->generate('homepage'));
        } else {
            if (!$user->getApiKey()) {
                $characterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $apiKeyLength = 64;
                $characterSetLength = strlen($characterSet);
                $apiKey = '';
                for ($i = 0; $i < $apiKeyLength; ++$i) {
                    $apiKey .= $characterSet[rand(0, $characterSetLength - 1)];
                }
                $user->setApiKey(rtrim(base64_encode(sha1(uniqid('ue' . rand(rand(), rand())) . $apiKey)), '='));
            }

            $tomorrow = new \DateTime('tomorrow');
            $tomorrow->format('Y-m-d H:i:s');

            $user->setApiKeyExpiresAt($tomorrow);

            $this->em->persist($user);
            $this->em->flush();

            $response = new RedirectResponse($this->router->generate('management'));
            $response->headers->setCookie(new Cookie('APIKEY', $user->getApiKey()));
            $response->setContent($user->getApiKey());
        }

        return $response;
    }
}