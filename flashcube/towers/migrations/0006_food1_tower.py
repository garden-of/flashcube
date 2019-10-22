from django.db import migrations

TOWER_DATA = {
    'name': 'Food Basics',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
        {'English':'the apple','Spanish':'la manzana','Portuguese':'a maçã','Italian':'la mela','French':'la pomme','German':'der Apfel, die Äpfel'},
        {'English':'the avocado','Spanish':'El aguacate','Portuguese':'o abacate','Italian':'l\'avocado','French':'l\'avocat','German':'die Avocado, Avocados'},
        {'English':'the banana','Spanish':'el plátano','Portuguese':'a banana','Italian':'la banana','French':'la banane','German':'die Banane, die Bananen'},
        {'English':'the beef','Spanish':'la carne de vacuno','Portuguese':'O bife','Italian':'la carne bovina','French':'le boeuf','German':'Das Fleisch, die beefs'},
        {'English':'the beer','Spanish':'la cerveza','Portuguese':'A cerveja','Italian':'la birra','French':'la bière','German':'das Bier, die Biere'},
        {'English':'the bell pepper','Spanish':'el pimiento','Portuguese':'o pimentão','Italian':'il peperone','French':'le poivron','German':'der Paprika, der Paprika'},
        {'English':'the bitter','Spanish':'el amargo','Portuguese':'o amargo','Italian':'l\'amaro','French':'l\'amer','German':'Das Bittere, die Bitters'},
        {'English':'the boil','Spanish':'la ebullición','Portuguese':'fervura','Italian':'ebollizione','French':'ébullition','German':'das Kochen, die kocht'},
        {'English':'the bottle','Spanish':'la botella','Portuguese':'a garrafa','Italian':'la bottiglia','French':'la bouteille','German':'die Flasche, die Flaschen'},
        {'English':'the broth','Spanish':'el caldo','Portuguese':'o caldo','Italian':'il brodo','French':'Le bouillon','German':'die Brühe, die Brühen'},
        {'English':'the butter','Spanish':'la mantequilla','Portuguese':'a manteiga','Italian':'il burro','French':'le beurre','German':'die Butter, Butters'},
        {'English':'the cafeteria','Spanish':'la cafeteria','Portuguese':'a cafeteria','Italian':'la caffetteria','French':'la cafétéria','German':'die Cafeteria, Mensen'},
        {'English':'the cake','Spanish':'el pastel','Portuguese':'o bolo','Italian':'la torta','French':'le gâteau','German':'der Kuchen, die Kuchen'},
        {'English':'the cake','Spanish':'el pastel','Portuguese':'o bolo','Italian':'la torta','French':'le gâteau','German':'der Kuchen, die Kuchen'},
        {'English':'the can','Spanish':'la lata','Portuguese':'a lata','Italian':'La lattina','French':'la canette','German':'Die Dose, die Dosen'},
        {'English':'the carrot','Spanish':'la zanahoria','Portuguese':'A cenoura','Italian':'la carota','French':'la carotte','German':'Die Karotte, die Karotten'},
        {'English':'the cheese','Spanish':'el queso','Portuguese':'o queijo','Italian':'il formaggio','French':'le fromage','German':'der Käse, die Käse'},
        {'English':'the cherry','Spanish':'la cereza','Portuguese':'A cereja','Italian':'la ciliegia','French':'la cerise','German':'die Kirsche, die cherrys'},
        {'English':'the chicken','Spanish':'el pollo','Portuguese':'a galinha','Italian':'il pollo','French':'le poulet','German':'das Hähnchen, die Hühner'},
        {'English':'the chop','Spanish':'la chuleta','Portuguese':'a costeleta','Italian':'il taglio','French':'le clapot','German':'das Kotelett, die Koteletts'},
        {'English':'the cook','Spanish':'el cocinero','Portuguese':'o cozinheiro','Italian':'il cuoco','French':'le cuisinier','German':'die Köchin, Die Köche'},
        {'English':'the cookie','Spanish':'La galleta','Portuguese':'o biscoito','Italian':'il biscotto','French':'le cookie','German':'der Keks, die Kekse'},
        {'English':'the cookie/biscuit','Spanish':'la cookie / galleta','Portuguese':'o cookie / biscuit','Italian':'il cookie / biscotto','French':'le cookie / biscuit','German':'das Cookie / Keks, die Plätzchen / Kekse'},
        {'English':'the corn','Spanish':'el maiz','Portuguese':'o milho','Italian':'il Corno','French':'le mais','German':'Der Mais, die Corns'},
        {'English':'the crab','Spanish':'el cangrejo','Portuguese':'o caranguejo','Italian':'il granchio','French':'le crabe','German':'die Krabbe, die Krabben'},
        {'English':'the cream','Spanish':'La crema','Portuguese':'o creme','Italian':'la crema','French':'la crème','German':'die Creme, die Cremes'},
        {'English':'the cream cheese','Spanish':'la crema de queso','Portuguese':'o cream cheese','Italian':'la crema di formaggio','French':'le fromage à la crème','German':'der Rahmkäse, die Rahmkäse'},
        {'English':'the cucumber','Spanish':'el pepino','Portuguese':'','Italian':'il cetriolo','French':'le concombre','German':'die Gurke, die Gurken'},
        {'English':'the cuisine','Spanish':'La cocina','Portuguese':'a cozinha','Italian':'la cucina','French':'la cuisine','German':'die Küche, die Küchen'},
        {'English':'the cup','Spanish':'la taza','Portuguese':'a xícara','Italian':'La tazza','French':'la tasse','German':'die Tasse, die Tassen'},
        {'English':'the dairy product','Spanish':'el producto lácteo','Portuguese':'o produto lácteo','Italian':'il prodotto lattiero-caseario','French':'le produit laitier','German':'das Milchprodukt, die Milchprodukte'},
        {'English':'the diet/regimen','Spanish':'la dieta / régimen','Portuguese':'a dieta / regime','Italian':'la dieta / regime','French':'le régime / régime','German':'die Diät / Regime, die Diät / Regime'},
        {'English':'the dinner/to have dinner','Spanish':'la cena / a cenar','Portuguese':'jantar / jantar','Italian':'la cena / di cenare','French':'le dîner / dîner','German':'das Abendessen / zum Abendessen, das Abendessen / Abendessen haben'},
        {'English':'the drink','Spanish':'la bebida','Portuguese':'a bebida','Italian':'la bevanda','French':'la boisson','German':'das Getränk, Die Getränke'},
        {'English':'the duck','Spanish':'el pato','Portuguese':'o pato','Italian':'l\'anatra','French':'le canard','German':'die Ente, die Enten'},
        {'English':'the farm/ranch','Spanish':'la granja / rancho','Portuguese':'a exploração / rancho','Italian':'l\'azienda agricola / ranch','French':'la ferme / ranch','German':'die Farm / Ranch, die Farm / Ranchs'},
        {'English':'the fish','Spanish':'el pez','Portuguese':'o Peixe','Italian':'il pesce','French':'le poisson','German':'der Fisch, die fishs'},
        {'English':'the flour','Spanish':'la harina','Portuguese':'a farinha','Italian':'la farina','French':'la farine','German':'das Mehl, die Mehle'},
        {'English':'the fork','Spanish':'El tenedor','Portuguese':'o garfo','Italian':'la forchetta','French':'la fourchette','German':'die Gabel, die Gabeln'},
        {'English':'the fresh','Spanish':'el fresco','Portuguese':'o fresco','Italian':'il fresco','French':'le frais','German':'das frische, die Freshs'},
        {'English':'the fried','Spanish':'el frito','Portuguese':'o frito','Italian':'il fritto','French':'le plat','German':'die gebratenen, die frieds'},
        {'English':'the fruit','Spanish':'la fruta','Portuguese':'a fruta','Italian':'il frutto','French':'le fruit','German':'das Obst, die Früchte'},
        {'English':'the garlic','Spanish':'El ajo','Portuguese':'o alho','Italian':'l\'aglio','French':'l\'ail','German':'der Knoblauch, die garlics'},
        {'English':'the glass (drinking)','Spanish':'el cristal (potable)','Portuguese':'o vidro (potável)','Italian':'il vetro (bere)','French':'le verre (potable)','German':'das Glas (Trink-), das Glas (Trink-) s'},
        {'English':'the grape','Spanish':'la uva','Portuguese':'A uva','Italian':'l\'uva','French':'le raisin','German':'die Traube, die Trauben'},
        {'English':'the grapefruit','Spanish':'la toronja','Portuguese':'toranja','Italian':'il pompelmo','French':'le pamplemousse','German':'Die Grapefruit, die Grapefruits'},
        {'English':'the ground beef','Spanish':'la carne picada','Portuguese':'a carne moída','Italian':'la carne macinata','French':'le boeuf haché','German':'das Hackfleisch, der Boden beefs'},
        {'English':'the ham','Spanish':'el jamón','Portuguese':'o presunto','Italian':'il prosciutto','French':'le jambon','German':'der Schinken, die Schinken'},
        {'English':'the hunger','Spanish':'El hambre','Portuguese':'a fome','Italian':'la fame','French':'la faim','German':'der Hunger, die hungern'},
        {'English':'the hunger','Spanish':'El hambre','Portuguese':'a fome','Italian':'la fame','French':'la faim','German':'der Hunger, die hungern'},
        {'English':'the juice','Spanish':'el jugo','Portuguese':'o suco','Italian':'il succo','French':'le jus','German':'der Saft, die Säfte'},
        {'English':'the knife','Spanish':'el cuchillo','Portuguese':'a faca','Italian':'il coltello','French':'le couteau','German':'das Messer, das Messer'},
        {'English':'the lard','Spanish':'la manteca de cerdo','Portuguese':'a banha','Italian':'il lardo','French':'le lard','German':'das Schmalz, die Schmalz'},
        {'English':'the lobster','Spanish':'la langosta','Portuguese':'A lagosta','Italian':'l\'aragosta','French':'le homard','German':'der Hummer, die Hummer'},
        {'English':'the lunch','Spanish':'el almuerzo','Portuguese':'O almoço','Italian':'il pranzo','French':'le déjeuner','German':'Das Mittagessen, die lunchs'},
        {'English':'the lungs','Spanish':'los pulmones','Portuguese':'os pulmões','Italian':'i polmoni','French':'les poumons','German':'die Lungen, die lungss'},
        {'English':'the make, to','Spanish':'la marca, a','Portuguese':'a marca, a','Italian':'la marca, per','French':'la marque, à','German':'die Marke, zu, die Marke, tos'},
        {'English':'the mango','Spanish':'el mango','Portuguese':'a manga','Italian':'il mango','French':'la mangue','German':'die Mango, die Mangos'},
        {'English':'the margarine','Spanish':'la margarina','Portuguese':'a margarina','Italian':'la margarina','French':'la margarine','German':'die Margarine, die Margarinen'},
        {'English':'the mayonese','Spanish':'la mayonese','Portuguese':'a maionese','Italian':'la mayonese','French':'le mayonese','German':'die mayonese, die mayoneses'},
        {'English':'the menu','Spanish':'El menú','Portuguese':'o cardápio','Italian':'il menu','French':'le menu','German':'das Menü, die Menüs'},
        {'English':'the movie theather','Spanish':'la theather película','Portuguese':'o teatro filme','Italian':'il Teatro di film','French':'le Thêatre film','German':'der Film theather, der Film theathers'},
        {'English':'the mustard','Spanish':'La mostaza','Portuguese':'a mostarda','Italian':'la senape','French':'la moutarde','German':'der Senf, die mustards'},
        {'English':'the napkin','Spanish':'La servilleta','Portuguese':'o guardanapo','Italian':'il tovagliolo','French':'la serviette','German':'die Serviette, die Servietten'},
        {'English':'the olive oil','Spanish':'el aceite de oliva','Portuguese':'o azeite','Italian':'l\'olio d\'oliva','French':'l\'huile d\'olive','German':'das Olivenöl, die Olivenöle'},
        {'English':'the pear','Spanish':'la pera','Portuguese':'a pêra','Italian':'la pera','French':'La poire','German':'die Birne, die Birnen'},
        {'English':'the pepper','Spanish':'el chile','Portuguese':'a pimenta','Italian':'il pepe','French':'le poivre','German':'der Pfeffer, der Paprika'},
        {'English':'the pineapple','Spanish':'la piña','Portuguese':'o abacaxi','Italian':'l\'ananas','French':'l\'ananas','German':'die Ananas, die Ananas'},
        {'English':'the plate','Spanish':'el plato','Portuguese':'o prato','Italian':'il piatto','French':'la plaque','German':'der Teller, die Teller'},
        {'English':'the pomegranate','Spanish':'la granada','Portuguese':'a romã','Italian':'il melograno','French':'la grenade','German':'der Granatapfel, die Granaten'},
        {'English':'the pork','Spanish':'El puerco','Portuguese':'O porco','Italian':'la carne di maiale','French':'le porc','German':'das Schweinefleisch, die porks'},
        {'English':'the potato','Spanish':'la papa','Portuguese':'a batata','Italian':'La patata','French':'la pomme de terre','German':'die Kartoffel, die potatos'},
        {'English':'the poultry','Spanish':'las aves de corral','Portuguese':'avícola','Italian':'del pollame','French':'la volaille','German':'das Geflügel, die poultrys'},
        {'English':'the reipe','Spanish':'la reipe','Portuguese':'o reipe','Italian':'il reipe','French':'le reipe','German':'die reipe, die reipes'},
        {'English':'the salad','Spanish':'La ensalada','Portuguese':'a salada','Italian':'l\'insalata','French':'la salade','German':'Der Salat, die Salate'},
        {'English':'the salt','Spanish':'la sal','Portuguese':'o sal','Italian':'il sale','French':'le sel','German':'das Salz, die Salze'},
        {'English':'the salty','Spanish':'el salado','Portuguese':'o salgado','Italian':'il salato','French':'le salé','German':'die salzige, die Saltys'},
        {'English':'the sauce','Spanish':'la salsa','Portuguese':'o molho','Italian':'la salsa','French':'la sauce','German':'die Soße, die Saucen'},
        {'English':'the shellfish','Spanish':'los mariscos','Portuguese':'o marisco','Italian':'i frutti di mare','French':'les coquillages','German':'die Schalentiere, die shellfishs'},
        {'English':'the soup','Spanish':'la sopa','Portuguese':'a sopa','Italian':'la zuppa','French':'la soupe','German':'die Suppe, die Suppen'},
        {'English':'the soy','Spanish':'la soja','Portuguese':'a soja','Italian':'la soia','French':'le soja','German':'das Soja, die soys'},
        {'English':'the spinach','Spanish':'la espinaca','Portuguese':'O espinafre','Italian':'gli spinaci','French':'les épinards','German':''},
        {'English':'the spoon','Spanish':'la cuchara','Portuguese':'a colher','Italian':'il cucchiaio','French':'la cuillère','German':'der Löffel, die Löffel'},
        {'English':'the stawberry','Spanish':'la stawberry','Portuguese':'o stawberry','Italian':'lo stawberry','French':'le stawberry','German':'die stawberry, die stawberrys'},
        {'English':'the steak','Spanish':'el filete','Portuguese':'o bife','Italian':'la bistecca','French':'le steak','German':'das Steak, die Steaks'},
        {'English':'the stew','Spanish':'el estofado','Portuguese':'o cozido','Italian':'lo spezzatino','French':'le ragoût','German':'der Eintopf, die Eintöpfe'},
        {'English':'the strawberry','Spanish':'la fresa','Portuguese':'o morango','Italian':'la fragola','French':'la fraise','German':'Die Erdbeere, die strawberrys'},
        {'English':'the sugar','Spanish':'el azúcar','Portuguese':'o açúcar','Italian':'lo zucchero','French':'le sucre','German':'der Zucker, der Zucker'},
        {'English':'the sweet','Spanish':'el dulce','Portuguese':'o doce','Italian':'il dolce','French':'la douce','German':'die Süßigkeit, die Süßigkeiten'},
        {'English':'the sweets','Spanish':'los dulces','Portuguese':'os doces','Italian':'i dolci','French':'les bonbons','German':'die Süßigkeiten, die sweetss'},
        {'English':'the tablecloth','Spanish':'el mantel','Portuguese':'a toalha de mesa','Italian':'la tovaglia','French':'La nappe','German':'Die Tischdecke, die Tischdecken'},
        {'English':'the to boil','Spanish':'la hierva','Portuguese':'a ferver','Italian':'l\'a bollire','French':'la à ébullition','German':'die kochen, die zu siedet'},
        {'English':'the to clean','Spanish':'la de limpiar','Portuguese':'o de limpar','Italian':'il da pulire','French':'le nettoyer à','German':'die reinigen, die reinigt'},
        {'English':'the to cook','Spanish':'la para cocinar','Portuguese':'a cozinhar','Italian':'il per cucinare','French':'le cuisiner','German':'die kochen, die kocht'},
        {'English':'the toast','Spanish':'la tostada','Portuguese':'o brinde','Italian':'il toast','French':'le toast','German':'Das Toastbrot, die Toasts'},
        {'English':'the tray','Spanish':'la bandeja','Portuguese':'a bandeja','Italian':'il vassoio','French':'le plateau','German':'die Schale, die Tabletts'},
        {'English':'the turkey','Spanish':'El pavo','Portuguese':'o Peru','Italian':'il tacchino','French':'la dinde','German':'der Truthahn, die Truthähne'},
        {'English':'the utensils','Spanish':'los utensilios','Portuguese':'os utensílios','Italian':'gli utensili','French':'les ustensiles','German':'Utensilien, die utensilss'},
        {'English':'the vanilla','Spanish':'la vainilla','Portuguese':'a baunilha','Italian':'la vaniglia','French':'la vanille','German':'die Vanille, die vanillas'},
        {'English':'the vegetables','Spanish':'los vegetales','Portuguese':'os vegetais','Italian':'le verdure','French':'les légumes','German':'das Gemüse, die vegetabless'},
    )
}

def create_tower(apps, schema_editor):

    # get primary category
    Category = apps.get_model('towers', 'Category')
    primary_category = Category.objects.get(category=TOWER_DATA['categories'][0])

    Tower = apps.get_model('towers', 'Tower')
    sports_tower = Tower.objects.create(
        name=TOWER_DATA['name'],
        primary_category=primary_category
    )
    sports_tower.save()

    # add category associations
    for c in TOWER_DATA['categories']:
        sports_tower.categories.add(Category.objects.get(category=c))
        sports_tower.save()

    # create cubes and cube faces
    Cube = apps.get_model('towers', 'Cube')
    Face = apps.get_model('towers', 'Face')
    for cube_data in TOWER_DATA['cubes']:
        cube = Cube.objects.create(
            name=cube_data[primary_category.category],
            tower=sports_tower
        )
        cube.save()
        for c in cube_data.keys():
            face = Face.objects.create(
                value=cube_data[c],
                category=Category.objects.get(category=c),
                cube=cube
            )
            face.save()


class Migration(migrations.Migration):

    dependencies = [
        ('towers', '0004_sports_tower'),
    ]

    operations = [
        migrations.RunPython(create_tower)
    ]
