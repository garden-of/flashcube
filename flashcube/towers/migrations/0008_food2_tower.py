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
       {'English':'the soda','Spanish':'el refresco','Portuguese':'o refrigerante','Italian':'la gazzosa','French':'La boisson gazéifiée','German':'die Soda, die Limonaden'},
{'English':'the straw','Spanish':'la paja','Portuguese':'a palha','Italian':'la paglia','French':'la paille','German':'der Strohhalm, die Strohhalme'},
{'English':'the basil','Spanish':'la albahaca','Portuguese':'o manjericão','Italian':'il basilico','French':'le basilic','German':'das Basilikum, die Basils'},
{'English':'the vinegar','Spanish':'el vinagre','Portuguese':'o vinagre','Italian':'l\'aceto','French':'le vinaigre','German':'der Essig, die Essige'},
{'English':'the waiter','Spanish':'El camarero','Portuguese':'o garçom','Italian':'il cameriere','French':'le serveur','German':'der Kellner, die Kellner'},
{'English':'the wine','Spanish':'el vino','Portuguese':'o vinho','Italian':'il vino','French':'le vin','German':'der Wein, Weine'},
{'English':'the wine glass','Spanish':'la copa de vino','Portuguese':'o copo de vinho','Italian':'il calice','French':'le verre de vin','German':'das Weinglas, der Wein glasss'},
{'English':'the yogurt','Spanish':'el yogurt','Portuguese':'o iogurte','Italian':'lo yogurt','French':'le yaourt','German':'der Joghurt, die Joghurts'},
{'English':'the sip','Spanish':'la SIP','Portuguese':'SIP','Italian':'il sorso','French':'la gorgée','German':'die sip, sIPS'},
{'English':'the pepper','Spanish':'el chile','Portuguese':'a pimenta','Italian':'il pepe','French':'le poivre','German':'der Pfeffer, der Paprika'},
{'English':'The cranberry','Spanish':'el arándano','Portuguese':'o cranberry','Italian':'il mirtillo rosso','French':'la canneberge','German':'die Cranberry, die Preiselbeeren'},
{'English':'the check','Spanish':'el cheque','Portuguese':'a conta','Italian':'il controllo','French':'le cheque','German':'die Prüfung, die Kontrollen'},
{'English':'the meat','Spanish':'la carne','Portuguese':'a carne','Italian':'la carne','French':'la viande','German':'das Fleisch, das Fleisch'},
{'English':'the chair','Spanish':'la silla','Portuguese':'a cadeira','Italian':'la sedia','French':'la chaise','German':'der Stuhl, Die Stühle'},
{'English':'the table','Spanish':'la mesa','Portuguese':'a mesa','Italian':'la tavola','French':'la table','German':'Der Tisch, die Tische'},
{'English':'the mug','Spanish':'La taza','Portuguese':'a caneca','Italian':'la tazza','French':'la tasse','German':'die Becher, die Tassen'},
{'English':'the dessert','Spanish':'el postre','Portuguese':'a sobremesa','Italian':'il dessert','French':'le dessert','German':'das Dessert, die Desserts'},
{'English':'the liquor','Spanish':'el licor','Portuguese':'o licor','Italian':'il liquore','French':'la liqueur','German':'die Flotte, die Flotten'},
{'English':'the cocktail','Spanish':'el cóctel','Portuguese':'o cocktail','Italian':'il cocktail','French':'le cocktail','German':'der Cocktail, die Cocktails'},
{'English':'the flavor','Spanish':'el sabor','Portuguese':'o sabor','Italian':'il sapore','French':'le goût','German':'der Geschmack, die Aromen'},
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
