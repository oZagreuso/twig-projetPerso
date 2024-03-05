<?php

namespace App\Controller;

use App\Repository\BenevoleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BenevoleController extends AbstractController
{
    #[Route('/benevole', name: 'benevole_')]
    public function index(BenevoleRepository $benevoleRepository): Response
    {
        $benevole = $benevoleRepository->findAll();

        return $this->render('benevole/benevole.html.twig', [
            'benevole' => $benevole,
        ]);
}

}
