<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BasicHeaderController extends AbstractController
{
    #[Route('/basic/header', name: 'basicHeader_')]
    public function index(): Response
    {
        return $this->render('basic_header/basicHeader.html.twig', [
            'controller_name' => 'BasicHeaderController',
        ]);
    }
}
