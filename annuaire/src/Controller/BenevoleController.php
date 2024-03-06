<?php

namespace App\Controller;

use App\Repository\BenevoleRepository;
use App\Entity\Benevole;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class BenevoleController extends AbstractController
{
    /*
    #[Route('/benevole', name: 'benevole_')]
    public function index(BenevoleRepository $benevoleRepository): Response
    {
        $benevole = $benevoleRepository->findAll();

        return $this->render('benevole/benevole.html.twig', [
            'benevole' => $benevole,
        ]);
    }
    */

    #[Route('/benevole', name: 'benevole_')]
    public function index(BenevoleRepository $benevoleRepository, Request $request): Response
    {
        $selectedBenevoleId = $request->query->has('selectedBenevoleId') ? $request->query->get('selectedBenevoleId') : null;
    
        if ($selectedBenevoleId !== null) {
            $selectedBenevole = $benevoleRepository->find($selectedBenevoleId);
            $benevoleList = $selectedBenevole ? [$selectedBenevole] : [];
        } else {
            $benevoleList = $benevoleRepository->findAll();
        }
    
        return $this->render('benevole/benevole.html.twig', [
            'benevoleList' => $benevoleList,
        ]);
    }
}
