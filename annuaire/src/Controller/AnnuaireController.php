<?php

namespace App\Controller;

use App\Entity\Benevole;
use App\Repository\BenevoleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AnnuaireController extends AbstractController
{
    #[Route('/annuaire', name: 'annuaire_')]
    #[Route('/', name: 'homepage')]
    public function index(): Response
    {
        return $this->render('annuaire/homepage.html.twig', [
            'controller_name' => 'AnnuaireController',
        ]);
    }

    #[Route('/annuaire', name: 'annuaire_')]
    #[Route('/', name: 'homepage')]
    public function benevole(BenevoleRepository $benevoleRepository): Response
    {
        return $this->render('annuaire/homepage.html.twig', [
            'benevole' => $benevoleRepository->findBy([], ['nom' => 'asc'])
        ]);
    }
}
