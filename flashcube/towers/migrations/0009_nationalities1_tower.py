from django.db import migrations

TOWER_DATA = {
    'name': 'Nationalities 1',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
       {'English':'Albanian','Spanish':'albanés','Portuguese':'albanês','Italian':'albanese','French':'albanais','German':'albanisch'},
{'English':'Algerian','Spanish':'argelino','Portuguese':'argelino','Italian':'algerino','French':'algérien','German':'algerisch'},
{'English':'Andorran','Spanish':'andorrana','Portuguese':'Andorra','Italian':'andorran','French':'andorran','German':'Andorraner'},
{'English':'Antarctic','Spanish':'antártico','Portuguese':'antártico','Italian':'antartico','French':'antarctique','German':'Antarktis'},
{'English':'Argentinian, Argentine','Spanish':'Argentina, argentina','Portuguese':'Argentina, argentino','Italian':'Argentino, argentina','French':'Argentine, Argentine','German':'Argentinier, Argentinien'},
{'English':'Australian','Spanish':'australiano','Portuguese':'australiano','Italian':'australiano','French':'australien','German':'australisch'},
{'English':'Austrian','Spanish':'austriaco','Portuguese':'austríaco','Italian':'austriaco','French':'autrichien','German':'österreichisch'},
{'English':'Bahamian','Spanish':'las Bahamas','Portuguese':'Bahamian','Italian':'Bahamas','French':'Bahaméen','German':'Bahamian'},
{'English':'Belgian','Spanish':'Belga','Portuguese':'Belga','Italian':'belga','French':'Belge','German':'Belgier'},
{'English':'Belizean','Spanish':'belizean','Portuguese':'Belize','Italian':'Belize','French':'bélizien','German':'Belizean'},
{'English':'Bolivian','Spanish':'boliviano','Portuguese':'boliviano','Italian':'boliviano','French':'bolivien','German':'bolivianisch'},
{'English':'Brazilian','Spanish':'brasileño','Portuguese':'brasileiro','Italian':'brasiliano','French':'brésilien','German':'brasilianisch'},
{'English':'Bulgarian','Spanish':'búlgaro','Portuguese':'búlgaro','Italian':'bulgaro','French':'bulgare','German':'bulgarisch'},
{'English':'Cabo Verdean','Spanish':'Cabo Verde','Portuguese':'Cabo-verdiana','Italian':'Cabo Verde','French':'Cabo verdien','German':'Cabo Verdes'},
{'English':'Cambodian','Spanish':'camboyano','Portuguese':'cambojano','Italian':'cambogiano','French':'cambodgien','German':'kambodschanisch'},
{'English':'Cameroonian','Spanish':'camerunés','Portuguese':'camaronês','Italian':'camerunese','French':'Cameroun','German':'Kameruner'},
{'English':'Canadian','Spanish':'canadiense','Portuguese':'canadense','Italian':'canadese','French':'canadien','German':'kanadisch'},
{'English':'Caymanian','Spanish':'caimán','Portuguese':'Caymanian','Italian':'Caymanian','French':'caïmanaise','German':'Caymanian'},
{'English':'Chilean','Spanish':'chileno','Portuguese':'chileno','Italian':'cileno','French':'chilien','German':'chilenisch'},
{'English':'Chinese','Spanish':'chino','Portuguese':'chinês','Italian':'Cinese','French':'chinois','German':'Chinesisch'},
{'English':'Colombian','Spanish':'colombiano','Portuguese':'colombiano','Italian':'colombiano','French':'colombien','German':'kolumbianisch'},
{'English':'Costa Rican','Spanish':'Costa Rica','Portuguese':'Costa riquenho','Italian':'costaricano','French':'costaricain','German':'costaricanisch'},
{'English':'Ivorian','Spanish':'de Costa de Marfil','Portuguese':'ivoiriense','Italian':'ivoriano','French':'Ivoirien','German':'ivorischen'},
{'English':'Croatian','Spanish':'croata','Portuguese':'croata','Italian':'croato','French':'croate','German':'kroatisch'},
{'English':'Cuban','Spanish':'cubano','Portuguese':'cubano','Italian':'cubano','French':'cubain','German':'kubanisch'},
{'English':'Cypriot','Spanish':'chipriota','Portuguese':'cipriota','Italian':'cipriota','French':'chypriote','German':'zyprischen'},
{'English':'Czech','Spanish':'checo','Portuguese':'tcheco','Italian':'ceco','French':'tchèque','German':'Tschechisch'},
{'English':'Danish','Spanish':'danés','Portuguese':'dinamarquês','Italian':'danese','French':'danois','German':'dänisch'},
{'English':'Dominican','Spanish':'dominicano','Portuguese':'dominicano','Italian':'domenicano','French':'dominicain','German':'dominikanisch'},
{'English':'Ecuadorian','Spanish':'ecuatoriano','Portuguese':'equatoriano','Italian':'ecuadoriano','French':'Equateur','German':'Ecuadorianer'},
{'English':'Egyptian','Spanish':'egipcio','Portuguese':'egípcio','Italian':'egiziano','French':'égyptien','German':'ägyptisch'},
{'English':'Salvadoran','Spanish':'salvadoreño','Portuguese':'salvadorenho','Italian':'salvadoregna','French':'El Salvador','German':'in El Salvador'},
{'English':'English people, English','Spanish':'Los ingleses, Inglés','Portuguese':'Os ingleses, Inglês','Italian':'la gente inglese, inglese','French':'Anglais, Anglais','German':'Englisch Menschen, Englisch'},
{'English':'Ethiopian','Spanish':'etíope','Portuguese':'etíope','Italian':'etiope','French':'éthiopien','German':'äthiopisch'},
{'English':'European','Spanish':'europeo','Portuguese':'europeu','Italian':'europeo','French':'européen','German':'europäisch'},
{'English':'Finnish','Spanish':'finlandés','Portuguese':'finlandês','Italian':'finlandese','French':'finlandais','German':'finnisch'},
{'English':'French','Spanish':'francés','Portuguese':'francês','Italian':'francese','French':'français','German':'Französisch'},
{'English':'Georgian','Spanish':'georgiano','Portuguese':'georgiano','Italian':'georgiano','French':'géorgien','German':'georgisch'},
{'English':'German','Spanish':'alemán','Portuguese':'alemão','Italian':'Tedesco','French':'allemand','German':'Deutsche'},
{'English':'Ghanaian','Spanish':'ghanés','Portuguese':'Gana','Italian':'del Ghana','French':'ghanéen','German':'ghanaisch'},
{'English':'Gibraltar','Spanish':'Gibraltar','Portuguese':'Gibraltar','Italian':'Gibilterra','French':'Gibraltar','German':'Gibraltar'},
{'English':'Greek, Hellenic','Spanish':'Griego, Hellenic','Portuguese':'Grego, Hellenic','Italian':'Greca, Hellenic','French':'Grec, hellénique','German':'Griechisch, Hellenic'},
{'English':'Greenlandic','Spanish':'Groenlandia','Portuguese':'groenlandês','Italian':'Groenlandese','French':'groenlandais','German':'Grönländisch'},
{'English':'Guatemalan','Spanish':'guatemalteco','Portuguese':'guatemalteco','Italian':'guatemalteca','French':'guatémaltèque','German':'guatemaltekisch'},
{'English':'Haitian','Spanish':'haitiano','Portuguese':'haitiano','Italian':'Haiti','French':'haïtien','German':'haitianisch'},
{'English':'Honduran','Spanish':'hondureña','Portuguese':'hondurenho','Italian':'honduregno','French':'Honduras','German':'honduranisch'},
{'English':'Hong Kong, Cantonese, Hong Konger','Spanish':'Hong Kong, cantonés, hongkonés','Portuguese':'Hong Kong, cantonês, Hong Konger','Italian':'Hong Kong, il cantonese, Hong Konger','French':'Hong Kong, cantonais, Hong Konger','German':'Hong Kong, Kantonesisch, Hong Konger'},
{'English':'Hungarian, Magyar','Spanish':'Húngaro, Magyar','Portuguese':'Húngaro, Magyar','Italian':'Ungherese, Magyar','French':'Hongrois, Magyar','German':'Ungarisch, Magyar'},
{'English':'Icelandic','Spanish':'islandés','Portuguese':'islandês','Italian':'islandese','French':'islandais','German':'isländisch'},
{'English':'Indian','Spanish':'indio','Portuguese':'indiano','Italian':'indiano','French':'Indien','German':'indisch'},
{'English':'Indonesian','Spanish':'indonesio','Portuguese':'indonésio','Italian':'indonesiano','French':'indonésien','German':'Indonesier'},
{'English':'Iranian, Persian','Spanish':'Iraní, persa','Portuguese':'Iraniano, persa','Italian':'Iraniano, Persiano','French':'Iranien, persane','German':'Iraner, Persisch'},
{'English':'Iraqi','Spanish':'iraquí','Portuguese':'iraquiano','Italian':'iracheno','French':'irakien','German':'irakisch'},
{'English':'Irish','Spanish':'irlandesa','Portuguese':'irlandês','Italian':'irlandesi','French':'irlandais','German':'irisch'},
{'English':'Israeli, Israelite','Spanish':'Israel, Israel','Portuguese':'Israelita, israelita','Italian':'Israeliana, Israele','French':'Israël, Israélite','German':'Israeli, Israelit'},
{'English':'Italian','Spanish':'italiano','Portuguese':'italiano','Italian':'italiano','French':'italien','German':'Italienisch'},
{'English':'Ivorian','Spanish':'de Costa de Marfil','Portuguese':'ivoiriense','Italian':'ivoriano','French':'Ivoirien','German':'ivorischen'},
{'English':'Jamaican','Spanish':'jamaicano','Portuguese':'jamaicano','Italian':'giamaicano','French':'Jamaïquain','German':'jamaikanisch'},
{'English':'Japanese','Spanish':'japonés','Portuguese':'japonês','Italian':'giapponese','French':'Japonais','German':'japanisch'},
{'English':'Kenyan','Spanish':'de Kenia','Portuguese':'queniano','Italian':'keniano','French':'kényen','German':'Kenyan'},
{'English':'North Korean','Spanish':'Norcoreano','Portuguese':'norte-coreano','Italian':'Corea del nord','French':'Nord coréen','German':'nordkoreanisch'},
{'English':'South Korean','Spanish':'Sur coreano','Portuguese':'Sul-coreano','Italian':'Corea del Sud','French':'Sud coréen','German':'Südkorea'},
{'English':'Lao, Laotian','Spanish':'Lao, laosiano','Portuguese':'Lao, Laos','Italian':'Lao, laotiano','French':'Lao, laotien','German':'Lao, laotischen'},
{'English':'Lebanese','Spanish':'libanés','Portuguese':'libanês','Italian':'libanese','French':'libanais','German':'libanesisch'},
{'English':'Lithuanian','Spanish':'lituano','Portuguese':'lituano','Italian':'lituano','French':'lituanien','German':'litauisch'},
{'English':'Malagasy','Spanish':'madagascarí','Portuguese':'malgaxe','Italian':'malgascio','French':'malgache','German':'Malagasy'},
{'English':'Malaysian','Spanish':'malasio','Portuguese':'Malaysian','Italian':'malese','French':'Malaisie','German':'malaysisch'},
{'English':'Mexican','Spanish':'mexicano','Portuguese':'mexicano','Italian':'messicano','French':'mexicain','German':'Mexikaner'},
{'English':'Monégasque, Monacan','Spanish':'Monégasque, Monacan','Portuguese':'Monegasco, Monacan','Italian':'Monégasque, Monacan','French':'Monégasque, Monacan','German':'Monégasque, Monacan'},
{'English':'Montserratian','Spanish':'montserratian','Portuguese':'montserratian','Italian':'Montserrat','French':'Montserratian','German':'Montserrat'},
{'English':'Moroccan','Spanish':'marroquí','Portuguese':'marroquino','Italian':'marocchino','French':'marocain','German':'marokkanisch'},
{'English':'Mozambican','Spanish':'mozambiqueño','Portuguese':'Moçambique','Italian':'Mozambico','French':'Mozambique','German':'mosambikanischen'},
{'English':'Namibian','Spanish':'namibio','Portuguese':'Namíbia','Italian':'Namibia','French':'Namibie','German':'namibisch'},
{'English':'Nepali, Nepalese','Spanish':'Nepalí, Nepal','Portuguese':'Nepalês, nepalês','Italian':'Nepalese, nepalese','French':'Népalais, népalais','German':'Nepali, nepalesisch'},
{'English':'Dutch, Netherlandic','Spanish':'Holandés, el neerlandés','Portuguese':'Holandês, Netherlandic','Italian':'Olandese, neerlandese','French':'Néerlandais, Netherlandic','German':'Niederländisch, niederländische'},
{'English':'New Zealand','Spanish':'Nueva Zelanda','Portuguese':'Nova Zelândia','Italian':'Nuova Zelanda','French':'Nouvelle-Zélande','German':'Neuseeland'},
{'English':'Nicaraguan','Spanish':'nicaragüense','Portuguese':'nicaraguense','Italian':'Nicaragua','French':'nicaraguayen','German':'Nicaraguaner'},
{'English':'Nigerian','Spanish':'nigeriano','Portuguese':'nigeriano','Italian':'nigeriano','French':'Nigeria','German':'Nigerianer'},
{'English':'Norwegian','Spanish':'noruego','Portuguese':'norueguês','Italian':'norvegese','French':'norvégien','German':'norwegisch'},
{'English':'Palestinian','Spanish':'palestino','Portuguese':'palestino','Italian':'palestinese','French':'palestinien','German':'palästinensisch'},
{'English':'Panamanian','Spanish':'panameño','Portuguese':'panamenho','Italian':'panamense','French':'panaméen','German':'panamaisch'},
{'English':'Paraguayan','Spanish':'paraguayo','Portuguese':'paraguaio','Italian':'paraguaiano','French':'paraguayen','German':'Paraguayer'},
{'English':'Peruvian','Spanish':'peruano','Portuguese':'peruano','Italian':'peruviano','French':'péruvien','German':'peruanisch'},
{'English':'Filipino, Philippine','Spanish':'Filipina, filipina','Portuguese':'Filipino, Filipinas','Italian':'Filippina, filippina','French':'Philippin, Philippine','German':'Filipino, Philippinen'},
{'English':'Polish','Spanish':'polaco','Portuguese':'polonês','Italian':'polacco','French':'polonais','German':'Polieren'},
{'English':'Portuguese','Spanish':'portugués','Portuguese':'Português','Italian':'portoghese','French':'Portugais','German':'Portugiesisch'},
{'English':'Puerto Rican','Spanish':'puertorriqueño','Portuguese':'Porto-riquenho','Italian':'portoricano','French':'portoricain','German':'puertorikanisch'},
{'English':'Qatari','Spanish':'qatari','Portuguese':'qatari','Italian':'Qatar','French':'Qatari','German':'Qatari'},
{'English':'Romanian','Spanish':'rumano','Portuguese':'romena','Italian':'rumeno','French':'roumain','German':'rumänisch'},
{'English':'Russian','Spanish':'ruso','Portuguese':'russo','Italian':'russo','French':'russe','German':'Russisch'},
{'English':'Rwandan','Spanish':'Ruanda','Portuguese':'Ruanda','Italian':'ruandese','French':'Rwanda','German':'ruandischen'},
{'English':'São Toméan','Spanish':'Santo Tomé','Portuguese':'São Tomé e Príncipe','Italian':'São Tomé e Príncipe','French':'São Tomé e Príncipe','German':'São Tomé und Príncipe'},
{'English':'Saudi, Saudi Arabian','Spanish':'Arabia, Arabia Saudita','Portuguese':'Arábia, Arábia Saudita','Italian':'Arabia, Saudita','French':'Arabie, Arabie Saoudite','German':'Saudi-Arabien, Saudi Arabian'},
{'English':'Scottish','Spanish':'escocés','Portuguese':'escocês','Italian':'Scozzese','French':'Écossais','German':'schottisch'},
{'English':'Senegalese','Spanish':'senegalés','Portuguese':'senegalesa','Italian':'senegalese','French':'Sénégalais','German':'senegalesisch'},
{'English':'Serbian','Spanish':'serbio','Portuguese':'sérvio','Italian':'serbo','French':'serbe','German':'serbisch'},
{'English':'Singaporean','Spanish':'Singapur','Portuguese':'Singapura','Italian':'Singapore','French':'singapourien','German':'Singapurer'},
{'English':'Slovak','Spanish':'eslovaco','Portuguese':'eslovaco','Italian':'slovacco','French':'slovaque','German':'slowakisch'},
{'English':'Slovenian','Spanish':'esloveno','Portuguese':'esloveno','Italian':'sloveno','French':'slovène','German':'Slowenisch'},
{'English':'South African','Spanish':'sudafricano','Portuguese':'África do Sul','Italian':'sudafricano','French':'Sud africain','German':'südafrikanisch'},
{'English':'Spanish','Spanish':'Español','Portuguese':'espanhol','Italian':'spagnolo','French':'Espanol','German':'Spanisch'},
{'English':'Sudanese','Spanish':'sudanés','Portuguese':'sudanês','Italian':'sudanese','French':'soudanais','German':'Sudanese'},
{'English':'Swedish','Spanish':'sueco','Portuguese':'sueco','Italian':'svedese','French':'suédois','German':'Schwedisch'},
{'English':'Swiss','Spanish':'suizo','Portuguese':'suíço','Italian':'svizzero','French':'Suisse','German':'schweizerisch'},
{'English':'Syrian','Spanish':'Siria','Portuguese':'sírio','Italian':'siriana','French':'syrien','German':'syrisch'},
{'English':'Taiwanese','Spanish':'taiwanés','Portuguese':'Taiwan','Italian':'taiwanese','French':'taïwanaise','German':'Taiwanese'},
{'English':'Tanzanian','Spanish':'Tanzania','Portuguese':'Tanzânia','Italian':'Tanzania','French':'tanzanien','German':'Tansanier'},
{'English':'Thai','Spanish':'tailandés','Portuguese':'tailandês','Italian':'tailandese','French':'thaïlandais','German':'thailändisch'},
{'English':'Timorese','Spanish':'timorenses','Portuguese':'timorense','Italian':'Timor','French':'timorais','German':'Timorese'},
{'English':'Turkish','Spanish':'turco','Portuguese':'turco','Italian':'Turco','French':'turc','German':'Türkisch'},
{'English':'Ugandan','Spanish':'Uganda','Portuguese':'Uganda','Italian':'ugandese','French':'ougandais','German':'ugandisch'},
{'English':'Ukrainian','Spanish':'ucranio','Portuguese':'ucraniano','Italian':'ucraino','French':'ukrainien','German':'ukrainisch'},
{'English':'Emirati, Emirian, Emiri','Spanish':'Emiratí, Emirian, Emiri','Portuguese':'Emirados, Emirian, Emiri','Italian':'Emirati, Emirian, Emiri','French':'Émirati, Emirian, Emiri','German':'Emirati, Emirian, Emiri'},
{'English':'British, UK','Spanish':'Británicos, Reino Unido','Portuguese':'Britânico, Reino Unido','Italian':'Britannici, Regno Unito','French':'Britannique, Royaume-Uni','German':'British, UK'},
{'English':'American','Spanish':'americano','Portuguese':'americano','Italian':'americano','French':'américain','German':'amerikanisch'},
{'English':'Uruguayan','Spanish':'uruguayo','Portuguese':'uruguaio','Italian':'uruguaiano','French':'uruguayen','German':'Uruguayer'},
{'English':'Venezuelan','Spanish':'venezolano','Portuguese':'venezuelano','Italian':'venezuelano','French':'vénézuélien','German':'venezolanisch'},
{'English':'Vietnamese','Spanish':'vietnamita','Portuguese':'vietnamita','Italian':'vietnamita','French':'vietnamien','German':'Vietnamesisch'},
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
