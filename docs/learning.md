# Concept POO révision / approfondissement
Attribut ou paramètre du constructeur? (Est-ce que cette information doit être conservée dans l'objet après sa création ?)

    Oui → j'en fais un attribut (readonly, private, etc.).
    Non → je la laisse comme simple paramètre.


Attribut ou paramètre d'une méthode?

    Si plusieurs méthodes vont avoir besoin de la même information, je la stocke dans un attribut.
    Si une seule méthode en a besoin, je la passe en paramètre à cette méthode.

