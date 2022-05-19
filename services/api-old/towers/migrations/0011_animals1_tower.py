from django.db import migrations

TOWER_DATA = {
    'name': 'Animals',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
        {'English':'the goose','Spanish':'el ganso','Portuguese':'o Ganso','Italian':'l\'oca','French':'L\'oie','German':'die Gans, die gooses'},
        {'English':'the hedgehog','Spanish':'el erizo','Portuguese':'o ouriço','Italian':'il riccio','French':'le hérisson','German':'der Igel, die Igel'},
        {'English':'the hawk','Spanish':'el halcón','Portuguese':'o Falcão','Italian':'il falco','French':'le faucon','German':'der Habicht, die Falken'},
        {'English':'the eagle','Spanish':'el águila','Portuguese':'a águia','Italian':'l\'Aquila','French':'l\'aigle','German':'der Adler, die Adler'},
        {'English':'the snail','Spanish':'el caracol','Portuguese':'o caracol','Italian':'la lumaca','French':'l\'escargot','German':'die Schnecke, die Schnecken'},
        {'English':'the cockroach','Spanish':'la cucaracha','Portuguese':'a barata','Italian':'lo scarafaggio','French':'le cafard','German':'die Kakerlake, die cockroachs'},
        {'English':'the spider','Spanish':'la araña','Portuguese':'a aranha','Italian':'il ragno','French':'l\'araignée','German':'die Spinne, die Spinnen'},
        {'English':'the alligator','Spanish':'el caimán','Portuguese':'o jacaré','Italian':'l\'alligatore','French':'l\'alligator','German':'der Alligator, die Alligatoren'},
        {'English':'the ant','Spanish':'la hormiga','Portuguese':'a formiga','Italian':'la formica','French':'la fourmi','German':'die Ameise, die Ameisen'},
        {'English':'the bear','Spanish':'El oso','Portuguese':'o urso','Italian':'l\'orso','French':'l\'ours','German':'der Bär, die Bären'},
        {'English':'the bee','Spanish':'la abeja','Portuguese':'a abelha','Italian':'l\'ape','French':'l\'abeille','German':'die Biene, die Bienen'},
        {'English':'the bird','Spanish':'el pájaro','Portuguese':'o pássaro','Italian':'l\'uccello','French':'l\'oiseau','German':'der Vogel, die Vögel'},
        {'English':'the camel','Spanish':'el camello','Portuguese':'o camelo','Italian':'il cammello','French':'le chameau','German':'das Kamel, die Kamele'},
        {'English':'the cat','Spanish':'el gato','Portuguese':'o gato','Italian':'il gatto','French':'le chat','German':'die Katze, die Katzen'},
        {'English':'the cheetah','Spanish':'el guepardo','Portuguese':'a chita','Italian':'il ghepardo','French':'le guépard','German':'der Gepard, die Geparden'},
        {'English':'the chicken','Spanish':'el pollo','Portuguese':'a galinha','Italian':'il pollo','French':'le poulet','German':'das Hähnchen, die Hühner'},
        {'English':'the chimpanzee','Spanish':'el chimpancé','Portuguese':'o chimpanzé','Italian':'lo scimpanzé','French':'le chimpanzé','German':'der Schimpanse, die Schimpansen'},
        {'English':'the cow','Spanish':'la vaca','Portuguese':'a vaca','Italian':'la mucca','French':'la vache','German':'die Kuh, Die Kühe'},
        {'English':'the crocodile','Spanish':'el cocodrilo','Portuguese':'o crocodilo','Italian':'il coccodrillo','French':'le crocodile','German':'das Krokodil, die Krokodile'},
        {'English':'the deer','Spanish':'el ciervo','Portuguese':'o veado','Italian':'il cervo','French':'le cerf','German':'das Reh, die Hirsche'},
        {'English':'the dog','Spanish':'el perro','Portuguese':'o cachorro','Italian':'il cane','French':'le chien','German':'der Hund, die Hunde'},
        {'English':'the dolphin','Spanish':'el delfin','Portuguese':'O golfinho','Italian':'il delfino','French':'le dauphin','German':'der Delfin, Die Delfine'},
        {'English':'the duck','Spanish':'el pato','Portuguese':'o pato','Italian':'l\'anatra','French':'le canard','German':'die Ente, die Enten'},
        {'English':'the eagle','Spanish':'el águila','Portuguese':'a águia','Italian':'l\'Aquila','French':'l\'aigle','German':'der Adler, die Adler'},
        {'English':'the elephant','Spanish':'el elefante','Portuguese':'o elefante','Italian':'l\'elefante','French':'l\'éléphant','German':'der Elefant, Die Elefanten'},
        {'English':'the fish','Spanish':'el pez','Portuguese':'o Peixe','Italian':'il pesce','French':'le poisson','German':'der Fisch, die fishs'},
        {'English':'the fly','Spanish':'la mosca','Portuguese':'o voo','Italian':'il volo','French':'la mouche','German':'die Fliege, die flys'},
        {'English':'the fox','Spanish':'el zorro','Portuguese':'a Raposa','Italian':'la volpe','French':'le renard','German':'der Fuchs, die foxs'},
        {'English':'the frog','Spanish':'la rana','Portuguese':'o sapo','Italian':'la rana','French':'la grenouille','German':'der Frosch, die Frösche'},
        {'English':'the giraffe','Spanish':'la jirafa','Portuguese':'a girafa','Italian':'la giraffa','French':'la girafe','German':'die Giraffe, die Giraffen'},
        {'English':'the goat','Spanish':'la cabra','Portuguese':'a cabra','Italian':'la capra','French':'la chèvre','German':'die Ziege, die Ziegen'},
        {'English':'the goldfish','Spanish':'los peces de colores','Portuguese':'o peixinho','Italian':'il pesce rosso','French':'le poisson rouge','German':'der Goldfisch, die goldfishs'},
        {'English':'the hamster','Spanish':'el hamster','Portuguese':'o hamster','Italian':'il criceto','French':'le hamster','German':'der Hamster, die Hamster'},
        {'English':'the hippopotamus','Spanish':'el hipopótamo','Portuguese':'o hipopótamo','Italian':'l\'ippopotamo','French':'les hippopotames','German':'das Nilpferd, die hippopotamuss'},
        {'English':'the horse','Spanish':'el caballo','Portuguese':'o cavalo','Italian':'il cavallo','French':'le cheval','German':'das Pferd, die Pferde'},
        {'English':'the kangaroo','Spanish':'el canguro','Portuguese':'o canguru','Italian':'il canguro','French':'le kangourou','German':'das Känguru, die Kängurus'},
        {'English':'the kitten','Spanish':'el gatito','Portuguese':'o gatinho','Italian':'il gattino','French':'le chaton','German':'das Kätzchen, die Kätzchen'},
        {'English':'the lion','Spanish':'El león','Portuguese':'o Leão','Italian':'il Leone','French':'le lion','German':'der Löwe, die Löwen'},
        {'English':'the lobster','Spanish':'la langosta','Portuguese':'A lagosta','Italian':'l\'aragosta','French':'le homard','German':'der Hummer, die Hummer'},
        {'English':'the monkey','Spanish':'el mono','Portuguese':'o macaco','Italian':'la scimmia','French':'le singe','German':'der Affe, die Affen'},
        {'English':'the octopus','Spanish':'el pulpo','Portuguese':'o polvo','Italian':'il polpo','French':'la pieuvre','German':'der Oktopus, die octopuss'},
        {'English':'the owl','Spanish':'el búho','Portuguese':'a coruja','Italian':'il gufo','French':'Le hibou','German':'die Eule, die Eulen'},
        {'English':'the panda','Spanish':'el panda','Portuguese':'o Panda','Italian':'il panda','French':'le panda','German':'der Panda, die Pandas'},
        {'English':'the pig','Spanish':'el cerdo','Portuguese':'o porco','Italian':'il maiale','French':'le cochon','German':'das Schwein, die Schweine'},
        {'English':'the puppy','Spanish':'el cachorro','Portuguese':'o filhote de cachorro','Italian':'il cucciolo','French':'le chiot','German':'der Welpe, die puppys'},
        {'English':'the rabbit','Spanish':'El conejo','Portuguese':'o Coelho','Italian':'il coniglio','French':'le lapin','German':'Das Kaninchen, die Hasen'},
        {'English':'the rat','Spanish':'La rata','Portuguese':'o rato','Italian':'il ratto','French':'le rat','German':'die Ratte, die Ratten'},
        {'English':'the scorpion','Spanish':'el Escorpion','Portuguese':'o escorpião','Italian':'lo scorpione','French':'Le scorpion','German':'der Skorpion, die Skorpione'},
        {'English':'the seal','Spanish':'el sello','Portuguese':'o selo','Italian':'il sigillo','French':'le phoque','German':'die Dichtung, die Dichtungen'},
        {'English':'the shark','Spanish':'el tiburón','Portuguese':'o tubarão','Italian':'lo squalo','French':'le requin','German':'der Hai, Die Haie'},
        {'English':'the sheep','Spanish':'la oveja','Portuguese':'as ovelhas','Italian':'la pecora','French':'le mouton','German':'das Schaf, die Schafe'},
        {'English':'the snail','Spanish':'el caracol','Portuguese':'o caracol','Italian':'la lumaca','French':'l\'escargot','German':'die Schnecke, die Schnecken'},
        {'English':'the snake','Spanish':'la serpiente','Portuguese':'a cobra','Italian':'il serpente','French':'le serpent','German':'die Schlange, die Schlangen'},
        {'English':'the spider','Spanish':'la araña','Portuguese':'a aranha','Italian':'il ragno','French':'l\'araignée','German':'die Spinne, die Spinnen'},
        {'English':'the squirrel','Spanish':'la ardilla','Portuguese':'o esquilo','Italian':'lo scoiattolo','French':'l\'écureuil','German':'Das Eichhörnchen, die Eichhörnchen'},
        {'English':'the tiger','Spanish':'el Tigre','Portuguese':'o Tigre','Italian':'la tigre','French':'le tigre','German':'der Tiger, die Tiger'},
        {'English':'the turtle','Spanish':'la tortuga','Portuguese':'a tartaruga','Italian':'la tartaruga','French':'la tortue','German':'Die schildkröte, die Schildkröten'},
        {'English':'the wolf','Spanish':'el lobo','Portuguese':'o lobo','Italian':'il lupo','French':'le loup','German':'der Wolf, die Wolf'},
        {'English':'the zebra','Spanish':'la cebra','Portuguese':'a zebra','Italian':'la zebra','French':'le zèbre','German':'das Zebra, die Zebras'},
        {'English':'the afficionado','Spanish':'el aficionado','Portuguese':'o aficionado','Italian':'l\'aficionado','French':'l\'aficionado','German':'die afficionado, die afficionados'},
        {'English':'the glass','Spanish':'el cristal','Portuguese':'o vidro','Italian':'il vetro','French':'le verre','German':'das Glas, die glasss'},
        {'English':'the counter','Spanish':'el contador','Portuguese':'o contador','Italian':'il contatore','French':'le compteur','German':'der Zähler, die Zähler'},
        {'English':'the ludite','Spanish':'la ludite','Portuguese':'o ludite','Italian':'il ludite','French':'le ludite','German':'die ludite, die ludites'},
        {'English':'The tiger','Spanish':'El Tigre','Portuguese':'O Tigre','Italian':'La tigre','French':'Le tigre','German':'Der Tiger, Die Tiger'},
{'English':'the animal','Spanish':'el animal','Portuguese':'o animal','Italian':'l\'animale','French':'l\'animal','German':'das Tier, die Tiere'},
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
        ('towers', '0010_demonyms1_tower'),
    ]

    operations = [
        migrations.RunPython(create_tower)
    ]
