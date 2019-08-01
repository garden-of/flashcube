from django.db import migrations

TOWER_DATA = {
    'name': 'House 1',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
        {'English':'the wall','Spanish':'la pared','Portuguese':'a parede','Italian':'il muro','French':'le mur','German':'die Wand, die Wände'},
{'English':'the door','Spanish':'la puerta','Portuguese':'a porta','Italian':'la porta','French':'la porte','German':'die Tür, die Türen'},
{'English':'the bed','Spanish':'la cama','Portuguese':'a cama','Italian':'il letto','French':'le lit','German':'das Bett, die Betten'},
{'English':'first floor','Spanish':'primer piso','Portuguese':'primeiro andar','Italian':'primo piano','French':'premier étage','German':'Erdgeschoss, erste Etagen'},
{'English':'the floor','Spanish':'el piso','Portuguese':'o chão','Italian':'il pavimento','French':'le plancher','German':'der Boden, die Böden'},
{'English':'the bookshelf','Spanish':'la estantería','Portuguese':'a estante de livros','Italian':'la libreria','French':'La bibliothèque','German':'das Bücherregal, die Bücherregale'},
{'English':'the rug','Spanish':'la alfombra','Portuguese':'o tapete','Italian':'il tappeto','French':'le tapis','German':'der Teppich, die Teppiche'},
{'English':'the chair','Spanish':'la silla','Portuguese':'a cadeira','Italian':'la sedia','French':'la chaise','German':'der Stuhl, Die Stühle'},
{'English':'the frame','Spanish':'el marco','Portuguese':'a moldura','Italian':'la cornice','French':'le cadre','German':'der Rahmen, der Rahmen'},
{'English':'the door','Spanish':'la puerta','Portuguese':'a porta','Italian':'la porta','French':'la porte','German':'die Tür, die Türen'},
{'English':'the printer','Spanish':'la impresora','Portuguese':'a impressora','Italian':'la stampante','French':'L\'imprimante','German':'der Drucker, die Drucker'},
{'English':'the column','Spanish':'la columna','Portuguese':'a coluna','Italian':'la colonna','French':'la colonne','German':'die Kolumne, die Säulen'},
{'English':'the attic','Spanish':'el ático','Portuguese':'o sótão','Italian':'l\'attico','French':'le grenier','German':'der Dachboden, die Dachgeschosse'},
{'English':'the basement','Spanish':'el sótano','Portuguese':'o porão','Italian':'la cantina','French':'le sous-sol','German':'der Keller, die Keller'},
{'English':'the bath tub','Spanish':'la bañera','Portuguese':'a banheira','Italian':'la vasca da bagno','French':'le bain','German':'die Badewanne, die Badewannen'},
{'English':'the bathroom','Spanish':'el cuarto de baño','Portuguese':'o banheiro','Italian':'il bagno','French':'la salle de bain','German':'das Bad, die Badezimmer'},
{'English':'the bed','Spanish':'la cama','Portuguese':'a cama','Italian':'il letto','French':'le lit','German':'das Bett, die Betten'},
{'English':'the bedroom','Spanish':'el dormitorio','Portuguese':'o quarto','Italian':'la Camera da letto','French':'la chambre à coucher','German':'das Schlafzimmer, die Schlafzimmer'},
{'English':'the blanket','Spanish':'la manta','Portuguese':'o cobertor','Italian':'la coperta','French':'la couverture','German':'die Decke, die Decken'},
{'English':'the bookcase','Spanish':'la librería','Portuguese':'a estante de livros','Italian':'la libreria','French':'la bibliothèque','German':'das Bücherregal, die Bücherregale'},
{'English':'the carpet','Spanish':'la alfombra','Portuguese':'o tapete','Italian':'il tappeto','French':'le tapis','German':'der Teppich, die Teppiche'},
{'English':'the ceiling','Spanish':'el techo','Portuguese':'o teto','Italian':'il soffitto','French':'le plafond','German':'die Decke, die Decken'},
{'English':'the chair','Spanish':'la silla','Portuguese':'a cadeira','Italian':'la sedia','French':'la chaise','German':'der Stuhl, Die Stühle'},
{'English':'the closet','Spanish':'el armario','Portuguese':'o armário','Italian':'l\'armadio','French':'le placard','German':'der Schrank, die Schränke'},
{'English':'the couch','Spanish':'el sofá','Portuguese':'O sofá','Italian':'il divano','French':'le canapé','German':'die Couch, die couchs'},
{'English':'the curtain','Spanish':'la cortina','Portuguese':'a cortina','Italian':'la tenda','French':'le rideau','German':'der Vorhang, die Vorhänge'},
{'English':'the desk','Spanish':'el escritorio','Portuguese':'a mesa','Italian':'la scrivania','French':'le pupitre','German':'der Schreibtisch, die Schreibtische'},
{'English':'the dining room','Spanish':'el comedor','Portuguese':'sala de jantar','Italian':'la sala da pranzo','French':'la salle à manger','German':'der Speisesaal, die Speisesäle'},
{'English':'the door','Spanish':'la puerta','Portuguese':'a porta','Italian':'la porta','French':'la porte','German':'die Tür, die Türen'},
{'English':'the fan','Spanish':'el admirador','Portuguese':'o fã','Italian':'il fan','French':'le fan','German':'der Fan, Die Fans'},
{'English':'the floor','Spanish':'el piso','Portuguese':'o chão','Italian':'il pavimento','French':'le plancher','German':'der Boden, die Böden'},
{'English':'the furniture','Spanish':'los muebles','Portuguese':'a mobília','Italian':'il mobile','French':'les meubles','German':'die Möbel, die Möbel'},
{'English':'the garage','Spanish':'el garaje','Portuguese':'a garagem','Italian':'il garage','French':'Le garage','German':'die Garage, die Garagen'},
{'English':'the hall','Spanish':'el salon','Portuguese':'o Salão','Italian':'l\'entrata','French':'le hall','German':'die Halle, die Hallen'},
{'English':'the hallway','Spanish':'el pasillo','Portuguese':'o corredor','Italian':'il corridoio','French':'le couloir','German':'der Flur, die Flure'},
{'English':'the key','Spanish':'la clave','Portuguese':'a chave','Italian':'il tasto','French':'la clé','German':'der Schlüssel, die Schlüssel'},
{'English':'the kitchen','Spanish':'La cocina','Portuguese':'a cozinha','Italian':'la cucina','French':'la cuisine','German':'die Küche, die Küchen'},
{'English':'the lamp','Spanish':'la lámpara','Portuguese':'a lâmpada','Italian':'la lampada','French':'la lampe','German':'die Lampe, die Lampen'},
{'English':'the living room','Spanish':'la sala de estar','Portuguese':'a sala de estar','Italian':'il soggiorno','French':'le salon','German':'das Wohnzimmer, die Wohnräume'},
{'English':'the lock','Spanish':'La cerradura','Portuguese':'a fechadura','Italian':'la serratura','French':'le verrou','German':'das Schloss, die Schlösser'},
{'English':'the mirror','Spanish':'el espejo','Portuguese':'o espelho','Italian':'lo specchio','French':'le miroir','German':'der Spiegel, die Spiegel'},
{'English':'the picture','Spanish':'la imagen','Portuguese':'a imagem','Italian':'la foto','French':'l\'image','German':'das Bild, die Bilder'},
{'English':'the porch','Spanish':'el porche','Portuguese':'varanda','Italian':'il portico','French':'le porche','German':'die Veranda, die porchs'},
{'English':'the roof','Spanish':'el techo','Portuguese':'o telhado','Italian':'il tetto','French':'Le toit','German':'das Dach, die Dächer'},
{'English':'the room','Spanish':'la habitación','Portuguese':'a sala','Italian':'la stanza','French':'la chambre','German':'das Zimmer, die Räume'},
{'English':'the rug','Spanish':'la alfombra','Portuguese':'o tapete','Italian':'il tappeto','French':'le tapis','German':'der Teppich, die Teppiche'},
{'English':'the shelf','Spanish':'el estante','Portuguese':'a prateleira','Italian':'la mensola','French':'l\'étagère','German':'das Regal, die Regale'},
{'English':'the sink','Spanish':'el fregadero','Portuguese':'a pia','Italian':'il lavandino','French':'l\'évier','German':'das Waschbecken, die Waschbecken'},
{'English':'the sofa','Spanish':'el sofá','Portuguese':'o sofá','Italian':'il divano','French':'le canapé','German':'das Sofa, die Sofas'},
{'English':'the stairs','Spanish':'las escaleras','Portuguese':'as escadas','Italian':'le scale','French':'les escaliers','German':'die Treppe, die stairss'},
{'English':'the table','Spanish':'la mesa','Portuguese':'a mesa','Italian':'la tavola','French':'la table','German':'Der Tisch, die Tische'},
{'English':'the toilet','Spanish':'el inodoro','Portuguese':'o banheiro','Italian':'il bagno','French':'les toilettes','German':'die Toilette, die Toiletten'},
{'English':'the wall','Spanish':'la pared','Portuguese':'a parede','Italian':'il muro','French':'le mur','German':'die Wand, die Wände'},
{'English':'the window','Spanish':'la ventana','Portuguese':'a janela','Italian':'la finestra','French':'la fenêtre','German':'das Fenster, die Fenster'},
{'English':'the plate','Spanish':'el plato','Portuguese':'o prato','Italian':'il piatto','French':'la plaque','German':'der Teller, die Teller'},
{'English':'the bowl','Spanish':'el cuenco','Portuguese':'a tigela','Italian':'la ciotola','French':'le bol','German':'die Schale, die Schalen'},
{'English':'the fork','Spanish':'El tenedor','Portuguese':'o garfo','Italian':'la forchetta','French':'la fourchette','German':'die Gabel, die Gabeln'},
{'English':'the spoon','Spanish':'la cuchara','Portuguese':'a colher','Italian':'il cucchiaio','French':'la cuillère','German':'der Löffel, die Löffel'},
{'English':'the knife','Spanish':'el cuchillo','Portuguese':'a faca','Italian':'il coltello','French':'le couteau','German':'das Messer, das Messer'},
{'English':'the wine glass','Spanish':'la copa de vino','Portuguese':'o copo de vinho','Italian':'il calice','French':'le verre de vin','German':'das Weinglas, der Wein glasss'},
{'English':'the drinking glass','Spanish':'el vaso','Portuguese':'o copo','Italian':'o copo','French':'le verre à boire','German':'das Trinkglas, das Trinken glasss'},
{'English':'the mug','Spanish':'La taza','Portuguese':'a caneca','Italian':'la tazza','French':'la tasse','German':'die Becher, die Tassen'},
{'English':'the placemat','Spanish':'el mantel','Portuguese':'o placemat','Italian':'tovaglietta','French':'napperon','German':'die Platzdeckchen, die Platzdeckchen'},
{'English':'the tapestry','Spanish':'el tapiz','Portuguese':'a tapeçaria','Italian':'l\'arazzo','French':'la tapisserie','German':'die Tapisserie, die Wandbehänge'},
{'English':'the light','Spanish':'la luz','Portuguese':'a luz','Italian':'la luce','French':'la lumière','German':'das Licht, die Lichter'},
{'English':'the shower','Spanish':'la ducha','Portuguese':'o banho','Italian':'la doccia','French':'la douche','German':'Die Dusche, die Duschen'},
{'English':'the faucet','Spanish':'el grifo','Portuguese':'a torneira','Italian':'il rubinetto','French':'le robinet','German':'der Wasserhahn, die Wasserhähne'},
{'English':'the counter','Spanish':'el contador','Portuguese':'o contador','Italian':'il contatore','French':'le compteur','German':'der Zähler, die Zähler'},
{'English':'neat','Spanish':'ordenado','Portuguese':'arrumado','Italian':'pulito','French':'soigné','German':'ordentlich, Neats'},
{'English':'the shirt','Spanish':'la camisa','Portuguese':'a camisa','Italian':'la camicia','French':'la chemise','German':'das Hemd, die Hemden'},
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
        ('towers', '0003_auto_20190729_2134'),
    ]

    operations = [
        migrations.RunPython(create_tower)
    ]
