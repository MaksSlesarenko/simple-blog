<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ManagementController extends Controller
{
    /**
     * @Route("/management", name="management")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('management/index.html.twig');
    }
}
