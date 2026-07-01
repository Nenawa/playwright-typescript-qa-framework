# Concept POO révision / approfondissement
Attribut ou paramètre du constructeur? (Est-ce que cette information doit être conservée dans l'objet après sa création ?)

    Oui → j'en fais un attribut (readonly, private, etc.).
    Non → je la laisse comme simple paramètre.


Attribut ou paramètre d'une méthode?

    Si plusieurs méthodes vont avoir besoin de la même information, je la stocke dans un attribut.
    Si une seule méthode en a besoin, je la passe en paramètre à cette méthode.


    Les actions sont dans le POM.
    Les assertions sont dans le test.



POM

    Élément de la page
    │
    ├── dépend d'un paramètre ? locator dynamique ? plusieurs choix possibles ?
        Est-ce que je veux faire une action dessus ? (clic ? remplir?)
    │      │
    │      ├── NON → attribut (Locator)
    │      └── OUI → méthode qui retourne un Locator
    │
    └── Action utilisateur
           └── méthode async




    | Ce que je représente             | Dans le POM                       |
    | -------------------------------- | --------------------------------- |
    | Élément fixe de la page          | `readonly` Locator                |
    | Élément dépendant d'un paramètre | méthode qui retourne un `Locator` |
    | Action utilisateur               | méthode `async`                   |
    | Assertion                        | **jamais** dans le POM            |
           