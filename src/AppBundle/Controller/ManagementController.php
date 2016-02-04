<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use AppBundle\Entity\Post;

class ManagementController extends Controller
{
    /**
     * @Route("/management", name="management")
     */
    public function indexAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $dql = "SELECT p FROM AppBundle:Post p";
        $query = $em->createQuery($dql);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page', 1),
            13
        );

        return $this->render('AppBundle:Management:index.html.twig', ['pagination' => $pagination]);
    }

    /**
     * @Route("/management/post/add", name="post_add")
     */
    public function addAction(Request $request)
    {
        // create a task and give it some dummy data for this example
        $post = new Post();

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::class)
            ->add('save', SubmitType::class, ['label' => 'Create'])
            ->getForm();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $post->setTitle($form->get("title")->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            return $this->redirectToRoute('management');
        }

        return $this->render('AppBundle:Management:add.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/management/post/{id}/edit", name="post_edit")
     */
    public function editAction($id)
    {
        $post = $this->getDoctrine()->getRepository('AppBundle:Post')->find($id);

        if (!$post) {
           throw $this->createNotFoundException('No post found for id ' . $id);
        }

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::class)
            ->add('save', SubmitType::class, ['label' => 'Update'])
            ->getForm();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $post->setTitle($form->get("title")->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            return $this->redirectToRoute('management');
        }

        return $this->render('AppBundle:Management:edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
