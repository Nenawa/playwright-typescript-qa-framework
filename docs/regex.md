# Regex utiles en QA

/texte/		contient texte              // await expect(page).toHaveURL(/inventory/);

/^texte/	commence par texte  		//   expect("bonjour").toMatch(/^bon/);

/texte$/	Finit par "texte"		    // expect("bonjour").toMatch(/jour$/);

/\d+/		Un ou plusieurs chiffres	// valide: 123    abc123

/\s+/		Un ou plusieurs espaces		// valide: Jean Dupont

/./		    ⚠️ N'importe quel caractère

/\./		Pour rechercher un vrai point 

/i		    Insensitive à la casse		// await expect(errorMessage).toHaveText(/invalid/i);