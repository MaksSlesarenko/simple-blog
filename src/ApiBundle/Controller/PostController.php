<?php

namespace ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\JsonResponse;
use ApiBundle\Entity\Post;
use ApiBundle\Form\PostType;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{

    /**
     * @Route("/api/posts", name="post_create")
     * @Method({"POST"})
     */
    public function createAction(Request $request)
    {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);

        $response = new JsonResponse();

        $submittedData = [
            'title' => $request->request->get('title'),
            'description' => $request->request->get('description'),
            'body' => $request->request->get('body'),
        ];

        $form->submit($submittedData);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            $response->setStatusCode(Response::HTTP_OK);
            $response->setData($post);
        } else {
            $response->setStatusCode(Response::HTTP_BAD_REQUEST);
            $response->setData([
                'errors' => (string)$form->getErrors(true)
            ]);
        }
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/api/posts")
     * @Route("/api/posts/{id}", name="post_read")
     * @Method({"GET"})
     */
    public function readAction($id = null)
    {
        $response = new JsonResponse();

        if (null === $id) {
            //TODO: pagination
            $posts = $this->getDoctrine()->getRepository('ApiBundle:Post')->findAll();
        } else {
            $posts = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);
        }
        if (!$posts) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
        } else {
            $response->setStatusCode(Response::HTTP_OK);
            $response->setData($posts);
            $response->headers->set('Content-Type', 'application/json');
        }

        return $response;
    }

    /**
     * @Route("/api/posts/{id}", name="post_update")
     * @Method({"PUT"})
     */
    public function updateAction(Request $request, $id)
    {
        $post = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);

        $response = new JsonResponse();

        if (!$post) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);

            return $response;
        }

        $form = $this->createForm(PostType::class, $post);

        $submittedData = [
            'title' => $request->request->get('title'),
            'description' => $request->request->get('description'),
            'body' => $request->request->get('body'),
        ];

        $form->submit($submittedData);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();
            
            $response->setStatusCode(Response::HTTP_NO_CONTENT);
        } else {
            $response->setData([
                'errors' => (string) $form->getErrors(true)
            ]);
            $response->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/api/posts/{id}", name="post_delete")
     * @Method({"DELETE"})
     */
    public function deleteAction($id)
    {
        $post = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);

        $response = new JsonResponse();

        if (!$post) {
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            return $response;
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($post);
        $em->flush();

        $response->setStatusCode(Response::HTTP_NO_CONTENT);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
