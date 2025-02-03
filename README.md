# 🏗 Task Manager - Backend & Frontend

## Description
Ce projet est une application de gestion des tâches comprenant :
- **Backend** : Spring Boot avec REST APIs et H2 Database.
- **Frontend** : Angular avec PrimeNG pour l'interface utilisateur.

---

**Prérequis**
Avant de commencer, assure-toi d'avoir installé les versions suivantes :

**Backend** :
Java 21.0.1
Maven 3.8
**Frontend** :
Node.js v20.17.0
Angular CLI 18.2.14
**Outils recommandés** :
Visual Studio Code (VS Code) ou un IDE de ton choix


---

### **Démarrer le Backend (Spring Boot)**
1. Aller dans le dossier backend : 
   
   cd C:\TaskManagement\Task

 2. Lance l'application Spring Boot :
    mvn spring-boot:run

 3.Accéder à la base de données H2 (interface web) :

  **Ouvre un navigateur et accède à** :
  http://localhost:8080/h2-console
  **Configuration de connexion** :
  **JDBC URL** : jdbc:h2:mem:testdb
  **User** : sa
  **Password** : (voir application.properties)

  4.  **Tester le backend avec JUnit** :
     mvn test

 **Démarrer le Frontend (Angular)**
 1. Aller dans le dossier frontend : 

 cd C:\Users\manarbouoni\OneDrive\Desktop\Task Management\task-manager-app


2. Lance l'application Angular :
    ng serve

3. Accéder à l'application :

   http://localhost:4200

 4. Tester le frontend avec Jasmine & Karma :

         ng test


APIs disponibles dans le Backend
POST:	/tasks	Créer une nouvelle tâche
GET:	/tasks	Récupérer toutes les tâches avec filtrage et tri
PUT:	/tasks/{id}	Mettre à jour une tâche spécifique
DELETE:	/tasks/{id}	Supprimer une tâche

Fonctionnalités du Frontend
Liste des tâches :
-Affichage des tâches dans un tableau PrimeNG
-Tri et filtrage des tâches

Formulaire de gestion des tâches :
-Création et modification des tâches via un formulaire

Actions sur les tâches :
-Marquer une tâche comme terminée
-Supprimer une tâche avec confirmation

Interface responsive :
Adapté aux écrans mobiles et desktops



 
