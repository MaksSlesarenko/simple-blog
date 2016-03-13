<?php

namespace ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\JsonResponse;
use ApiBundle\Entity\Post;

class PostController extends Controller
{

    /**
     * @Route("/api/posts", name="post_create")
     * @Method({"POST"})
     */
    public function createAction(Request $request)
    {
        // create a task and give it some dummy data for this example
        $post = new Post();

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::class)
            ->add('save', SubmitType::class, ['label' => 'Create'])
            ->getForm();

        $form->handleRequest($request);

        $response = new JsonResponse();

        if ($form->isValid()) {
            $post->setTitle($form->get("title")->getData());

            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            $response->setData(json_encode(["posts" => $post]));
        } else {
            $response->setData(json_encode([
                'errors' => $form->getErrors()
            ]));
        }

        return $response;
    }

    /**
     * @Route("/api/posts")
     * @Route("/api/posts/{id}", name="post_read")
     * @Method({"GET"})
     */
    public function readAction($id = null) {
      $response = new JsonResponse();

      if (null === $id) {
          //TODO: pagination
          $posts = $this->getDoctrine()->getRepository('ApiBundle:Post')->findAll();
          foreach ($posts as $post => $index) {
            $posts[$index] = json_encode($post);
          }
      } else {
          $posts = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);
      }
      $response->setData(json_encode(["posts" => $posts]));

      return $response;
    }

    /**
     * @Route("/api/posts/{id}", name="post_update")
     * @Method({"PUT"})
     */
    public function updateAction($id)
    {
        $post = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);

        $response = new JsonResponse();

        if (!$post) {
            //TODO: return 404
            $response->setData(json_encode([
                'errors' => "Not found"
            ]));
        }

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::class)
            ->add('save', SubmitType::class, ['label' => 'Update'])
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $post->setTitle($form->get("title")->getData());

            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            $response->setData(json_encode(["posts" => $post]));
        } else {
            $response->setData(json_encode([
                'errors' => $form->getErrors()
            ]));
        }

        return $response;
    }

    /**
     * @Route("/api/posts/{id}", name="post_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id) {
        $post = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);

        $response = new JsonResponse();

        if (!$post) {
            //TODO: return 404
            $response->setData(json_encode([
                'errors' => "Not found"
            ]));
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($post);
        $em->flush();

        //TODO: use constant
        $response->setStatusCode(204);

        return $response;
    }
}
