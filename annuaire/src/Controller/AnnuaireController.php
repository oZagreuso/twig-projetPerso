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
        /*
            /// pour aller chercher un élément en particulier dans BenevoleRepository /// -->

            #[Route('/annuaire', name: 'annuaire_')]
            #[Route('/', name: 'homepage')]
            public function benevoleNom(BenevoleRepository $benevoleRepository): Response
            {
                return $this->render('annuaire/homepage.html.twig', [
                    'benevole' => $benevoleRepository->findBy([], ['nom' => 'asc'])
                ]);
            }*/

    #[Route('/annuaire', name: 'annuaire_')]
    #[Route('/', name: 'homepage')]
    public function benevoleNom(BenevoleRepository $benevoleRepository): Response
    {
        $benevole = $benevoleRepository->findAll();
        return $this->render('annuaire/homepage.html.twig', [
            'benevole' => $benevole,
        ]);

    }

}
