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
        $query = $this->get('doctrine.orm.entity_manager')->createQuery("SELECT p FROM ApiBundle:Post p");
        $pagination = $this->get('knp_paginator')->paginate($query, $request->query->getInt('page', 1), 5);

        return $this->render('AppBundle:default:index.html.twig', ['pagination' => $pagination]);
    }

    /**
     * @Route("/post/{id}", name="post_show")
     */
    public function showAction($id)
    {
        $post = $this->getDoctrine()->getRepository('ApiBundle:Post')->find($id);

        if (!$post) {
           throw $this->createNotFoundException('No post found for id ' . $id);
        }

        return $this->render('AppBundle:default:show.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @Route("/management", name="management")
     */
    public function managementAction(Request $request)
    {
        return $this->render('AppBundle:management:index.html.twig');
    }
}
