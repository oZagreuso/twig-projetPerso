/* --- --- METHODES VUE BENEVOLE --- --- */

/* --- Portail vers la vue admin.html.twig --- */

/*
function adminPortal() {
    window.location.href = '/admin';
}*/

////////////////////////////////////////////


// class AnnuaireRepository
// {
//     static apiBaseUrl = 'http://localhost:3000/api';

//     async fetchBenevolesData()
//     {
//         try
//         {
//             const response = await fetch(AnnuaireRepository.apiBaseUrl + '/benevoles');
//             const data = await response.json();
//             return data;
//         }
//         catch (error)
//         {
//             console.error('Echec de récupération des données via API');
//             throw error;
//         }
//     }
// }



class Benevole
{
    constructor(benevole)
    {
        this.id = benevole.id;
        this.nom = benevole.nom;
        this.prenom = benevole.prenom;
        this.telephone = benevole.telephone;
        this.poste = benevole.poste;

    }    
       
}





////////////////////////////////////////////


const app = {
    data() {
        return {
            listeBenevoles: [],
            listeBenevolesFiltered: [],
            inputBenevole: [],
            listeResponsables: [],
            selectedBenevole: null,
            benevoleChoice: null,
            selectedDeleteBenevole: null,
            benevoleDeleteChoice: null,
            responsable: null,
            targetedBenevole: null,
            targetedResponsable: null,
            deleteId: null,
            newBenevole: {
                nom: '',
                prenom: '',
                telephone: '',
                poste: ''
            }
         
        }
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            const apiBaseUrl = 'http://localhost:3000/api';
            const annuaireRepository = new AnnuaireRepository(apiBaseUrl);

            try {
                const apiData = await annuaireRepository.fetchBenevolesData();
                this.listeBenevoles = apiData.map(benevole => new Benevole(benevole));
                this.listeBenevoles.sort((a, b) => a.nom.localeCompare(b.nom));
                console.log(this.listeBenevoles);
                this.createListeResponsables();
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error.message);
            }
            this.listeBenevolesFiltered = [...this.listeBenevoles];
        },
       
        openModal(event) {
            let benevoleId = event.target.dataset.id;       
            this.selectedBenevole = this.listeBenevoles.find(x => x.id == benevoleId);
            console.log(this.$refs);
            this.$refs.modal.style.display = 'block';
        },
        closeModal() {
            this.$refs.modal.style.display ='none';
        },
        openDeleteModal(event) {
            let benevoleId = event.target.value;
            this.deleteId = benevoleId;
            this.selectedDeleteBenevole = this.listeBenevoles.find(x => x.id == benevoleId);
            console.log(this.$refs);
            this.$refs.deleteModal.style.display = 'block';
            console.log(this.selectedDeleteBenevole);
        },
        closeDeleteModal() {
            this.$refs.deleteModal.style.display ='none';
        },
        selectBenevole(event) {
            console.log(event.target.value);
            if(parseInt(event.target.value) > 0 ) {
                this.benevoleChoice = this.listeBenevoles.find(x => x.id == event.target.value);
            } else {
                this.benevoleChoice = null;
            }
            
        },
        selectDeleteBenevole(event) {
            console.log(event.target.value);
            if(parseInt(event.target.value) > 0 ) {
                this.benevoleDeleteChoice = this.listeBenevoles.find(x => x.id == event.target.value);
            } else {
                this.benevoleDeleteChoice = null;
            }
        },
         
        createListeResponsables() {
            this.listeResponsables = this.listeBenevoles.filter(benevole => benevole.poste !== undefined);
            console.log(this.listeResponsables);
        }, 
        
        filterBenevole(event) {
            if (parseInt(event.target.value) > 0) {
                console.log(event.target.value);
                this.targetedBenevole = event.target.value;
                this.listeBenevolesFiltered = this.listeBenevoles.filter(benevole => benevole.id == this.targetedBenevole);
                console.log(this.listeBenevolesFiltered);
                console.log(this.listeBenevoles);
                setTimeout(() => {
                    this.resetFilter();
                }, 5000);
            }
            else {
                this.listeBenevolesFiltered = this.listeBenevoles;
            }
        },
        resetFilter() {
            
            this.listeBenevolesFiltered = [...this.listeBenevoles];
            this.targetedBenevole = null;       
            const selectElement = document.querySelector('.liste');
            selectElement.selectedIndex = 0;
        },
        filterResponsable(event) {
            if (parseInt(event.target.value) > 0) {
                console.log(event.target.value);
                this.targetedResponsable = event.target.value;
                this.listeBenevolesFiltered = this.listeBenevoles.filter(benevole => benevole.id == this.targetedResponsable);
                console.log(this.listeBenevolesFiltered);
                console.log(this.listeBenevoles);
                setTimeout(() => {
                    this.resetFilter();
                }, 5000);
            }
            else {
                this.listeBenevolesFiltered = this.listeBenevoles;
            }
        },
        adminPortal() {
            window.location.href = 'admin.html';
        },  
        async deleteBenevole() {
            /*console.log(event);
            let benevoleDeleteId = event.target.value;
            console.log(benevoleDeleteId);*/
                if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bénévole?')) {
          
                    const apiBaseUrl = 'http://localhost:3000/api';  
                    const deleteBenevoleUrl = `${apiBaseUrl}/benevoles/${this.deleteId}`
        
                    try {
                        const response = await fetch(deleteBenevoleUrl, {
                            method: 'DELETE',
                        })
        
                        if (response.ok) {
                       
                            this.listeBenevoles = this.listeBenevoles.filter(benevole => benevole.id !== this.deleteId)
                            this.closeDeleteModal(); 
                        } else {
                            console.error('Echec de suppression!');
                        }
                    } catch (error) {
                        console.error('Erreur de connexion à l\'API:', error.message)
                    }
                
            }
        },    
        async addBenevole() {
            
            const apiBaseUrl = 'http://localhost:3000/api';  
            const addBenevoleUrl = `${apiBaseUrl}/benevoles`;
    
            try {
                const response = await fetch(addBenevoleUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newBenevole),
                });
    
                if (response.ok) {
                 
                    this.listeBenevoles.push(this.newBenevole);    
                   
                    this.newBenevole = {
                        nom: '',
                        prenom: '',
                        poste: '',
                        
                    }
                } else {
                    console.error('Erreur lors de l\'ajout du bénévole à la base de données.');
                }
            } catch (error) {
                console.error('Erreur de connexion à l\'API:', error.message);
            }
        },
              
        
     
            },    
            computed: { 
                nbBenevole() {
                        return this.listeBenevoles.length;
                            }
       
    }
}
    


Vue.createApp(app).mount('#app');




/* --- Gestion lites déroulantes --- */

/* - 1) Liste bénévoles - */

// benevoleScript.js

// externalScript.js

/*
function updateTable(data) {
    const benevoleTable = document.getElementById('benevoleTable');
    
    
    benevoleTable.innerHTML = '';

  
    data.forEach(benevole => {
        const newRow = `<tr>
                            <td>${benevole.prenom}</td>
                            <td>${benevole.nom}</td>
                            <td><button data-id="${benevole.id}" onclick="openModal(event)" class="btn">Info &#9993</button></td>
                        </tr>`;
        benevoleTable.insertAdjacentHTML('beforeend', newRow);
    });
}



function fetchData(selectedValue) {
   
    fetch(`/src/Controller/BenevoleController?nom=${selectedValue}`)
        .then(response => response.json()) 
        .then(data => {
         
            updateTable(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données filtrées', error);
        });
}*/

/*
class AnnuaireRepository
{
    static apiBaseUrl = 'http://localhost:3000/api';

    async fetchBenevolesData()
    {
        try
        {
            const response = await fetch(AnnuaireRepository.apiBaseUrl + '/benevoles');
            const data = await response.json();
            return data;
        }
        catch (error)
        {
            console.error('Echec de récupération des données via API');
            throw error;
        }
    }
}

class Benevole
{
    constructor(benevole)
    {
        this.id = benevole.id;
        this.nom = benevole.nom;
        this.prenom = benevole.prenom;
        this.telephone = benevole.telephone;
        this.poste = benevole.poste;

    }    
       
}

const app = {
    data() {
        return {
            listeBenevoles: [],
            listeBenevolesFiltered: [],
            inputBenevole: [],
            listeResponsables: [],
            selectedBenevole: null,
            benevoleChoice: null,
            selectedDeleteBenevole: null,
            benevoleDeleteChoice: null,
            responsable: null,
            targetedBenevole: null,
            targetedResponsable: null,
            deleteId: null,
            newBenevole: {
                nom: '',
                prenom: '',
                telephone: '',
                poste: ''
            }         
        }
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            const apiBaseUrl = 'http://localhost:3000/api';
            const annuaireRepository = new AnnuaireRepository(apiBaseUrl);

            try {
                const apiData = await annuaireRepository.fetchBenevolesData();
                this.listeBenevoles = apiData.map(benevole => new Benevole(benevole));
                this.listeBenevoles.sort((a, b) => a.nom.localeCompare(b.nom));
                console.log(this.listeBenevoles);
                this.createListeResponsables();
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error.message);
            }
            this.listeBenevolesFiltered = [...this.listeBenevoles];
        },
       
        openModal(event) {
            let benevoleId = event.target.dataset.id;       
            this.selectedBenevole = this.listeBenevoles.find(x => x.id == benevoleId);
            console.log(this.$refs);
            this.$refs.modal.style.display = 'block';
        },
        closeModal() {
            this.$refs.modal.style.display ='none';
        },
        openDeleteModal(event) {
            let benevoleId = event.target.value;
            this.deleteId = benevoleId;
            this.selectedDeleteBenevole = this.listeBenevoles.find(x => x.id == benevoleId);
            console.log(this.$refs);
            this.$refs.deleteModal.style.display = 'block';
            console.log(this.selectedDeleteBenevole);
        },
        closeDeleteModal() {
            this.$refs.deleteModal.style.display ='none';
        },
        selectBenevole(event) {
            console.log(event.target.value);
            if(parseInt(event.target.value) > 0 ) {
                this.benevoleChoice = this.listeBenevoles.find(x => x.id == event.target.value);
            } else {
                this.benevoleChoice = null;
            }
            
        },
        selectDeleteBenevole(event) {
            console.log(event.target.value);
            if(parseInt(event.target.value) > 0 ) {
                this.benevoleDeleteChoice = this.listeBenevoles.find(x => x.id == event.target.value);
            } else {
                this.benevoleDeleteChoice = null;
            }
        },
         
        createListeResponsables() {
            this.listeResponsables = this.listeBenevoles.filter(benevole => benevole.poste !== undefined);
            console.log(this.listeResponsables);
        }, 
        
        filterBenevole(event) {
            if (parseInt(event.target.value) > 0) {
                console.log(event.target.value);
                this.targetedBenevole = event.target.value;
                this.listeBenevolesFiltered = this.listeBenevoles.filter(benevole => benevole.id == this.targetedBenevole);
                console.log(this.listeBenevolesFiltered);
                console.log(this.listeBenevoles);
                setTimeout(() => {
                    this.resetFilter();
                }, 5000);
            }
            else {
                this.listeBenevolesFiltered = this.listeBenevoles;
            }
        },
        
        resetFilter() {
            
            this.listeBenevolesFiltered = [...this.listeBenevoles];
            this.targetedBenevole = null;       
            const selectElement = document.querySelector('.liste');
            selectElement.selectedIndex = 0;
        },
        filterResponsable(event) {
            if (parseInt(event.target.value) > 0) {
                console.log(event.target.value);
                this.targetedResponsable = event.target.value;
                this.listeBenevolesFiltered = this.listeBenevoles.filter(benevole => benevole.id == this.targetedResponsable);
                console.log(this.listeBenevolesFiltered);
                console.log(this.listeBenevoles);
                setTimeout(() => {
                    this.resetFilter();
                }, 5000);
            }
            else {
                this.listeBenevolesFiltered = this.listeBenevoles;
            }
        },
        adminPortal() {
            window.location.href = '/admin';
        },  
        async deleteBenevole() {
            console.log(event);
            let benevoleDeleteId = event.target.value;
            console.log(benevoleDeleteId);
                if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bénévole?')) {
          
                    const apiBaseUrl = 'http://localhost:3000/api';  
                    const deleteBenevoleUrl = `${apiBaseUrl}/benevoles/${this.deleteId}`
        
                    try {
                        const response = await fetch(deleteBenevoleUrl, {
                            method: 'DELETE',
                        })
        
                        if (response.ok) {
                       
                            this.listeBenevoles = this.listeBenevoles.filter(benevole => benevole.id !== this.deleteId)
                            this.closeDeleteModal(); 
                        } else {
                            console.error('Echec de suppression!');
                        }
                    } catch (error) {
                        console.error('Erreur de connexion à l\'API:', error.message)
                    }
                
            }
        },    
        async addBenevole() {
            
            const apiBaseUrl = 'http://localhost:3000/api';  
            const addBenevoleUrl = `${apiBaseUrl}/benevoles`;
    
            try {
                const response = await fetch(addBenevoleUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newBenevole),
                });
    
                if (response.ok) {
                 
                    this.listeBenevoles.push(this.newBenevole);    
                   
                    this.newBenevole = {
                        nom: '',
                        prenom: '',
                        poste: '',
                        
                    }
                } else {
                    console.error('Erreur lors de l\'ajout du bénévole à la base de données.');
                }
            } catch (error) {
                console.error('Erreur de connexion à l\'API:', error.message);
            }
        },
              
        
     
            },    
            computed: { 
                nbBenevole() {
                        return this.listeBenevoles.length;
                            }
       
    }
}
    


Vue.createApp(app).mount('#app');*/


