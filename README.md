To start server :

grunt serve

To test app:

grunt test

===



Models :

Quizz
Question
Answer

Media

---
Answer => Media

Media :
- String : "Reponse 1"
- Object : {
	"label" : "Reponse 1"
}
- Object media :
{
	"label" : "Reponse 1",
	"type" : "image"
	"src" : "img/lol.png"	// can be url
}

{
	"label" : "Reponse 1",
	"type" : "video"
	"src" : "img/lol.png"
}

{
	"label" : "Map france",
	"type" : "map",
	"src" : "(gmap area)"
}

--
Le tout doit etre couplé à un fichier de définition de règles :
data.json + rules.json = Quizz

Règles :
- 1 règle d'execution du Quizz
- X règle de questions

Exemple de règle de question :

- Proposition (nb de Proposition ?, degré de précision)
- Choix (nb d'élement, nb de bonne réponse, choix multiple)
- Proposition + indice possible ?



- 4 choix, 1 bonne reponse


rules.json :

{
	"version" : 0.1,

}