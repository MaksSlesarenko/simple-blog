<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Post;

class ManagementController extends Controller
{
    /**
     * @Route("/management", name="management")
     */
    public function indexAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $dql = "SELECT a FROM AcmeMainBundle:Article a";
        $query = $em->createQuery($dql);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page', 1),
            13
        );

        return $this->render('management/index.html.twig', ['pagination' => $pagination]);
    }

    /**
     * @Route("/post/add", name="post_add")
     */
    public function addAction(Request $request)
    {
        // create a task and give it some dummy data for this example
        $post = new Post();

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::class)
            ->getForm();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $post->setTitle($form->get("title"));
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();
            
            return $this->redirectToRoute('management');
        }

        return $this->render('management/add.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
