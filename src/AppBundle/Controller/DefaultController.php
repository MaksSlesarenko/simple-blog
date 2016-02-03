<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
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

        return $this->render('default/index.html.twig', ['pagination' => $pagination]);
    }

    /**
     * @Route("/post/{id}", name="post_show")
     */
    public function showAction($id)
    {
        $post = $this->getDoctrine()->getRepository('AppBundle:Post')->find($id);

        if (!$post) {
           throw $this->createNotFoundException('No post found for id ' . $id);
        }

        return $this->render('default/show.html.twig', [
            'post' => $post
        ]);
    }
}
