Sometimes to train somethign related with text and machine with Support Vector Machine procediment it's difficult to create and serve the correct data to the machine to learn.
Let's make an example:
We want a machine to learn from a set of texts and classify each them by training. We can't serve the entire text to the svm library you are using so the text must be converted to for example a MATRIX.
The script I've made it's very simple.
-Reads the document and decide if the word has meaning for the machine or not.
-Gets the most relevant words of the doucument and sorts them in a file called array.txt
-Reads the document you want to train (model) and creates a file like this:

	1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1
	1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,3
	0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1
	0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,3
	1,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,3
	1,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1,3
	1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,3
	1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3
	0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,3
	1,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,3
	0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1
	1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,3
	0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3
	1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1

	It's a matrix representing your document!
	Each horizontal column represents a label and each vertical column represents an attribute. line1 : [label1],[attr1],[attr2],[attr3]...[attrn].

Let's make an easy example!
We have libsvm and we want to create a model from a file that learns if something is written on French, Spanish or English.
The file looks like:

	"English", "This version of the simple language detection model was created on December 27, 2011"
	"French", "M. de Troisvilles, comme s'appelait encore sa famille en Gascogne, ou M. de TrÃ©ville, comme il avait fini par s'appeler lui-mÃªme Ã  Paris, avait rÃ©ellement commencÃ© comme d'Artagnan, c'est-Ã -dire sans un sou vaillant, mais avec ce fonds d'audace, d'esprit et d'entendement qui fait que le plus pauvre gentillÃ¢tre gascon reÃ§oit souvent plus en ses espÃ©rances de l'hÃ©ritage paternel que le plus riche gentilhomme pÃ©rigourdin ou berrichon ne reÃ§oit en rÃ©alitÃ©. Sa bravoure insolente, son bonheur plus insolent encore dans un temps oÃ¹ les coups pleuvaient comme grÃªle, l'avaient hissÃ© au sommet de cette Ã©chelle difficile qu'on appelle la faveur de cour, et dont il avait escaladÃ© quatre Ã  quatre les Ã©chelons."
	"French", "Et, saluant la dame d'un signe de tÃªte, il s'Ã©lanÃ§a sur son cheval, tandis que le cocher du carrosse fouettait vigoureusement son attelage. Les deux interlocuteurs partirent donc au galop, s'Ã©loignant chacun par un cÃ´tÃ© opposÃ© de la rue."
	"French", "Cette menace acheva d'intimider l'hÃ´te. AprÃ¨s le roi et M. le cardinal, M. de TrÃ©ville Ã©tait l'homme dont le nom peut-Ãªtre Ã©tait le plus souvent rÃ©pÃ©tÃ© par les militaires et mÃªme par les bourgeois. Il y avait bien le pÃ¨re Joseph, c'est vrai; mais son nom Ã  lui n'Ã©tait jamais prononcÃ© que tout bas, tant Ã©tait grande la terreur qu'inspirait l'Ã‰minence grise, comme on appelait le familier du cardinal."
	"English", "'Found IT,' the Mouse replied rather crossly: 'of course you know what 'it' means.'"
	"English", "'Only a thimble,' said Alice sadly."
	"French", "Â«Voyons, l'hÃ´te, dit-il, est-ce que vous ne me dÃ©barrasserez pas de ce frÃ©nÃ©tique? En conscience, je ne puis le tuer, et cependant, ajouta-t-il avec une expression froidement menaÃ§ante, cependant il me gÃªne. OÃ¹ est-il?"
	"English", "This was not an encouraging opening for a conversation. Alice replied, rather shyly, 'I--I hardly know, sir, just at present--at least I know who I WAS when I got up this morning, but I think I must have been changed several times since then.'"
	"English", "And she went on planning to herself how she would manage it. 'They must go by the carrier,' she thought; 'and how funny it'll seem, sending presents to one's own feet! And how odd the directions will look!"
	"Spanish", "En efeto, rematado ya su juicio, vino a dar en el mÃ¡s estraÃ±o pensamiento que jamÃ¡s dio loco en el mundo; y fue que le pareciÃ³ convenible y necesario, asÃ­ para el aumento de su honra como para el servicio de su repÃºblica, hacerse caballero andante, y irse por todo el mundo con sus armas y caballo a buscar las aventuras y a ejercitarse en todo aquello que Ã©l habÃ­a leÃ­do que los caballeros andantes se ejercitaban, deshaciendo todo gÃ©nero de agravio, y poniÃ©ndose en ocasiones y peligros donde, acabÃ¡ndolos, cobrase eterno nombre y fama. ImaginÃ¡base el pobre ya coronado por el valor de su brazo, por lo menos, del imperio de Trapisonda; y asÃ­, con estos tan agradables pensamientos, llevado del estraÃ±o gusto que en ellos sentÃ­a, se dio priesa a poner en efeto lo que deseaba."

After running the code, the model to train looks like:

	1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1
	1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,3
	0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1
	0,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,3
	1,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,3
	1,0,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1,3
	1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,3
	1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3
	0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,3
	1,1,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,3
	0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1
	1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,3
	0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3
	1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1
	1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1

Ready to train! 

In path variable you specify where your .txt files are. model.txt is the result file and 20.txt is the document you want to read to create the model.
In the line: return a.count > 100; 
a.acount returns an array that has the most repeated words on the file and 100 means that we want to split it where the word is less repeated than 100.
Array.txt is the file where a.count is saved and we would be able to see the most relevant words from the file.

Enjoy!

