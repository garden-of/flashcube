from django.db import migrations

TOWER_DATA = {
    'name': 'Demonyms 1',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
      {'English':'Albanians','Spanish':'albaneses','Portuguese':'albaneses','Italian':'albanesi','French':'Albanais','German':'Albaner'},
{'English':'Algerians','Spanish':'argelinos','Portuguese':'argelinos','Italian':'algerini','French':'Algériens','German':'Algerier'},
{'English':'Andorrans','Spanish':'andorranos','Portuguese':'andorranos','Italian':'andorrani','French':'Andorrans','German':'Andorraner'},
{'English':'Argentines, Argentinians','Spanish':'Argentinos, argentinos','Portuguese':'Argentinos, argentinos','Italian':'Argentini, argentini','French':'Argentins, Argentins','German':'Argentinier, Argentinier'},
{'English':'Australians','Spanish':'Los australianos','Portuguese':'Os australianos','Italian':'Gli australiani','French':'Australiens','German':'Australier'},
{'English':'Austrians','Spanish':'austriacos','Portuguese':'austríacos','Italian':'austriaci','French':'Autrichiens','German':'Österreicher'},
{'English':'Bahamians','Spanish':'bahameses','Portuguese':'Bahamians','Italian':'Bahamians','French':'Bahamiens','German':'Bahamians'},
{'English':'Belgians','Spanish':'belgas','Portuguese':'belgas','Italian':'belgi','French':'Belges','German':'Belgier'},
{'English':'Belizeans','Spanish':'beliceños','Portuguese':'Belizeans','Italian':'Belizeans','French':'Béliziens','German':'Belizianer'},
{'English':'Bolivians','Spanish':'bolivianos','Portuguese':'bolivianos','Italian':'boliviani','French':'Boliviens','German':'Bolivianer'},
{'English':'Brazilians','Spanish':'brasileños','Portuguese':'brasileiros','Italian':'brasiliani','French':'Brésiliens','German':'Brasilianer'},
{'English':'Bulgarians','Spanish':'búlgaros','Portuguese':'búlgaros','Italian':'bulgari','French':'Bulgares','German':'Bulgaren'},
{'English':'Cabo Verdeans','Spanish':'Cabo de Verdeans','Portuguese':'Cabo-verdianos','Italian':'Cabo Verdeans','French':'Cabo Verdiens','German':'Cabo Verdeans'},
{'English':'Cambodians','Spanish':'camboyanos','Portuguese':'cambojanos','Italian':'cambogiani','French':'Cambodgiens','German':'Kambodschaner'},
{'English':'Cameroonians','Spanish':'cameroonians','Portuguese':'camaroneses','Italian':'camerunensi','French':'Camerounais','German':'Cameroonians'},
{'English':'Canadians','Spanish':'Los canadienses','Portuguese':'Os canadenses','Italian':'I canadesi','French':'les Canadiens','German':'Kanadier'},
{'English':'Caymanians','Spanish':'Caimaneses','Portuguese':'Caymanians','Italian':'Caymanians','French':'Caïmanais','German':'Caymanians'},
{'English':'Chileans','Spanish':'chilenos','Portuguese':'Os chilenos','Italian':'cileni','French':'Chiliens','German':'Chilenen'},
{'English':'Chinese','Spanish':'chino','Portuguese':'chinês','Italian':'Cinese','French':'chinois','German':'Chinesisch'},
{'English':'Colombians','Spanish':'colombianos','Portuguese':'colombianos','Italian':'colombiani','French':'Colombiens','German':'Kolumbianer'},
{'English':'Costa Ricans','Spanish':'costarricenses','Portuguese':'Costa-riquenhos','Italian':'costaricani','French':'Costariciens','German':'Costaricaner'},
{'English':'Ivorians','Spanish':'Costa de Marfil','Portuguese':'marfinenses','Italian':'ivoriani','French':'Ivoiriens','German':'Ivorians'},
{'English':'Croatians, Croats','Spanish':'Croatas, croatas','Portuguese':'Croatas, croatas','Italian':'Croati, croati','French':'Croates, Croates','German':'Kroaten, Kroaten'},
{'English':'Cubans','Spanish':'cubanos','Portuguese':'Os cubanos','Italian':'I cubani','French':'Cubains','German':'Kubaner'},
{'English':'Cypriots','Spanish':'chipriotas','Portuguese':'cipriotas','Italian':'ciprioti','French':'Chypriotes','German':'Zyprioten'},
{'English':'Czechs','Spanish':'checos','Portuguese':'checos','Italian':'cechi','French':'Tchèques','German':'Tschechen'},
{'English':'Danes','Spanish':'daneses','Portuguese':'Danes','Italian':'Danes','French':'Danois','German':'Dänen'},
{'English':'Dominicans','Spanish':'dominicanos','Portuguese':'dominicanos','Italian':'Domenicani','French':'Dominicains','German':'Dominikaner'},
{'English':'Ecuadorians','Spanish':'ecuatorianos','Portuguese':'equatorianos','Italian':'ecuadoriani','French':'Equatoriens','German':'Ecuadorianer'},
{'English':'Egyptians','Spanish':'egipcios','Portuguese':'egípcios','Italian':'Egiziani','French':'Egyptiens','German':'Ägypter'},
{'English':'Salvadorans','Spanish':'salvadoreños','Portuguese':'salvadorenhos','Italian':'salvadoregni','French':'Salvadoriens','German':'Salvadorans'},
{'English':'English, Englishmen, Englishwomen','Spanish':'Inglés, ingleses, inglesas','Portuguese':'Inglês, ingleses, inglesas','Italian':'Inglese, inglesi, donne inglesi','French':'Anglais, Anglais, Anglaises','German':'Englisch, Engländer, Engländer'},
{'English':'Ethiopians, Habesha','Spanish':'Etíopes, Habesha','Portuguese':'Etíopes, Habesha','Italian':'Etiopi, Habesha','French':'Ethiopiens, Habesha','German':'Äthiopier, Habesha'},
{'English':'Europeans','Spanish':'Los europeos','Portuguese':'europeus','Italian':'Gli europei','French':'Européens','German':'Europäer'},
{'English':'Finns','Spanish':'finlandeses','Portuguese':'finlandeses','Italian':'finns','French':'Finlandais','German':'Finnen'},
{'English':'French, Frenchmen, Frenchwomen','Spanish':'Franceses, franceses, francesas','Portuguese':'Francês, franceses, francesas','Italian':'Francese, francesi, francesi','French':'Français, Françaises, Français','German':'Französisch, Franzosen, Franzö'},
{'English':'Georgians','Spanish':'georgianos','Portuguese':'georgianos','Italian':'georgiani','French':'Géorgiens','German':'Georgier'},
{'English':'Germans','Spanish':'alemanes','Portuguese':'alemães','Italian':'tedeschi','French':'Allemands','German':'Deutsche'},
{'English':'Ghanaians','Spanish':'ghaneses','Portuguese':'ganenses','Italian':'ghanesi','French':'Ghanéens','German':'Ghanaer'},
{'English':'Gibraltarians','Spanish':'gibraltareños','Portuguese':'gibraltinos','Italian':'Gibilterra','French':'Gibraltariens','German':'Gibraltarians'},
{'English':'Greeks, Hellenes','Spanish':'Griegos, los helenos','Portuguese':'Gregos, helenos','Italian':'Greci, Elleni','French':'Grecs, Hellènes','German':'Griechen, Hellenen'},
{'English':'Greenlanders','Spanish':'groenlandeses','Portuguese':'groenlandeses','Italian':'groenlandesi','French':'Groenlandais','German':'Grönländer'},
{'English':'Guatemalans','Spanish':'guatemaltecos','Portuguese':'guatemaltecos','Italian':'guatemaltechi','French':'Guatémaltèques','German':'Guatemalteken'},
{'English':'Haitians','Spanish':'haitianos','Portuguese':'haitianos','Italian':'haitiani','French':'Haïtiens','German':'Haitianer'},
{'English':'Hondurans','Spanish':'hondureños','Portuguese':'hondurenhos','Italian':'honduregni','French':'Honduriens','German':'Honduraner'},
{'English':'Hongkongers, Hong Kongese','Spanish':'Hongkongers, Hong Kongese','Portuguese':'Hongkongers, Hong Kongese','Italian':'Hongkongers, Hong Kongese','French':'Hongkongais, Hongkongais','German':'Hongkongers, Hong Kongese'},
{'English':'Hungarians, Magyars','Spanish':'Húngaros, los magiares','Portuguese':'Húngaros, magiares','Italian':'Ungheresi, magiari','French':'Hongrois, Magyars','German':'Ungarn, Magyaren'},
{'English':'Icelanders','Spanish':'Los islandeses','Portuguese':'islandeses','Italian':'islandesi','French':'Icelanders','German':'Isländer'},
{'English':'Indians','Spanish':'indios','Portuguese':'índios','Italian':'indiani','French':'Indiens','German':'Inder'},
{'English':'Indonesians','Spanish':'indonesios','Portuguese':'indonésios','Italian':'indonesiani','French':'Indonésiens','German':'Indonesier'},
{'English':'Iranians, Persians','Spanish':'Iraníes, persas','Portuguese':'Iranianos, persas','Italian':'Iraniani, Persiani','French':'Iraniens, Perses','German':'Iraner, Perser'},
{'English':'Iraqis','Spanish':'iraquíes','Portuguese':'iraquianos','Italian':'Gli iracheni','French':'Irakiens','German':'Iraker'},
{'English':'Irish, Irishmen, Irishwomen','Spanish':'Irlandés, Irlandeses, irlandesas','Portuguese':'Irlandeses, Irlandeses, irlandesas','Italian':'Irlandesi, Irishmen, donne irlandesi','French':'Irlandais, Irishmen, Irlandaises','German':'Irish, Irländer, Irländerinnen'},
{'English':'Israelis','Spanish':'israelíes','Portuguese':'israelenses','Italian':'israeliani','French':'Israéliens','German':'Israeli'},
{'English':'Italians','Spanish':'italianos','Portuguese':'italianos','Italian':'italiani','French':'Italiens','German':'Italiener'},
{'English':'Ivorians','Spanish':'Costa de Marfil','Portuguese':'marfinenses','Italian':'ivoriani','French':'Ivoiriens','German':'Ivorians'},
{'English':'Jamaicans','Spanish':'jamaiquinos','Portuguese':'jamaicanos','Italian':'giamaicani','French':'Jamaïcains','German':'Jamaikaner'},
{'English':'Japanese','Spanish':'japonés','Portuguese':'japonês','Italian':'giapponese','French':'Japonais','German':'japanisch'},
{'English':'Kenyans','Spanish':'kenianos','Portuguese':'quenianos','Italian':'keniani','French':'Kenyans','German':'Kenianer'},
{'English':'North Korean','Spanish':'Norcoreano','Portuguese':'norte-coreano','Italian':'Corea del nord','French':'Nord coréen','German':'nordkoreanisch'},
{'English':'South Korean','Spanish':'Sur coreano','Portuguese':'Sul-coreano','Italian':'Corea del Sud','French':'Sud coréen','German':'Südkorea'},
{'English':'Laos, Laotians','Spanish':'Laos, Laos','Portuguese':'Laos, Laos','Italian':'Laos, laotiani','French':'Laos, Laotiens','German':'Laos, Laoten'},
{'English':'Lebanese','Spanish':'libanés','Portuguese':'libanês','Italian':'libanese','French':'libanais','German':'libanesisch'},
{'English':'Lithuanians','Spanish':'lituanos','Portuguese':'lituanos','Italian':'lituani','French':'Lithuaniens','German':'Litauer'},
{'English':'Malagasy','Spanish':'madagascarí','Portuguese':'malgaxe','Italian':'malgascio','French':'malgache','German':'Malagasy'},
{'English':'Malaysians','Spanish':'malasios','Portuguese':'malaios','Italian':'malesi','French':'Malaisiens','German':'Malaysier'},
{'English':'Mexicans','Spanish':'mexicanos','Portuguese':'Os mexicanos','Italian':'messicani','French':'Mexicains','German':'Mexikaner'},
{'English':'Monégasques, Monacans','Spanish':'Monegascos, Monacans','Portuguese':'Monegasques, Monacans','Italian':'Monegaschi, monegaschi','French':'Monégasques monégasques','German':'Monegassen, Monacans'},
{'English':'Montserratians','Spanish':'Montserrat','Portuguese':'Montserrat','Italian':'Montserratians','French':'Montserratiens','German':'Montserratians'},
{'English':'Moroccans','Spanish':'marroquíes','Portuguese':'marroquinos','Italian':'marocchini','French':'Marocains','German':'Marokkaner'},
{'English':'Mozambicans','Spanish':'mozambiqueños','Portuguese':'moçambicanos','Italian':'mozambicani','French':'Mozambicains','German':'Mosambikaner'},
{'English':'Namibians','Spanish':'namibios','Portuguese':'namibianos','Italian':'namibiani','French':'Namibiens','German':'Namibier'},
{'English':'Nepali, Nepalese','Spanish':'Nepalí, Nepal','Portuguese':'Nepalês, nepalês','Italian':'Nepalese, nepalese','French':'Népalais, népalais','German':'Nepali, nepalesisch'},
{'English':'Dutch, Dutchmen, Dutchwomen, Netherlanders','Spanish':'Holandeses, holandeses, las holandesas, holandeses','Portuguese':'Holandês, holandeses, holandesas, holandeses','Italian':'Olandese, olandesi, Dutchwomen, Olandesi','French':'Néerlandais, Hollandais, Hollandaises, Flamands','German':'Holländer, Holländer, Holländerinnen, Netherlanders'},
{'English':'New Zealanders','Spanish':'Neozelandeses','Portuguese':'Novos zealanders','Italian':'neozelandesi','French':'Néo-Zélandais','German':'Neuseeländer'},
{'English':'Nicaraguans','Spanish':'Los nicaragüenses','Portuguese':'nicaragüenses','Italian':'nicaraguensi','French':'Nicaraguayens','German':'Nicaraguaner'},
{'English':'Nigerians','Spanish':'nigerianos','Portuguese':'nigerianos','Italian':'nigeriani','French':'Nigérians','German':'Nigerianer'},
{'English':'Norwegians','Spanish':'noruegos','Portuguese':'noruegueses','Italian':'norvegesi','French':'Norvégiens','German':'Norweger'},
{'English':'Palestinians','Spanish':'palestinos','Portuguese':'palestinos','Italian':'I palestinesi','French':'Palestiniens','German':'Palästinenser'},
{'English':'Panamanians','Spanish':'Los panameños','Portuguese':'panamenhos','Italian':'panamensi','French':'Panaméens','German':'Panamanians'},
{'English':'Paraguayans','Spanish':'paraguayos','Portuguese':'paraguaios','Italian':'paraguaiani','French':'Paraguayens','German':'Paraguayer'},
{'English':'Peruvians','Spanish':'peruanos','Portuguese':'peruanos','Italian':'peruviani','French':'Péruviens','German':'Peruaner'},
{'English':'Filipinos, Filipinas','Spanish':'Filipinos, Filipinas','Portuguese':'Filipinos, Filipinas','Italian':'Filippini, Filippine','French':'Philippins, Filipinas','German':'Filipinos, Filipinas'},
{'English':'Poles','Spanish':'polos','Portuguese':'Poles','Italian':'poli','French':'Polonais','German':'Stangen'},
{'English':'Portuguese','Spanish':'portugués','Portuguese':'Português','Italian':'portoghese','French':'Portugais','German':'Portugiesisch'},
{'English':'Puerto Ricans','Spanish':'puertorriqueños','Portuguese':'Porto-riquenhos','Italian':'portoricani','French':'Porto-Ricains','German':'Puertoricaner'},
{'English':'Qataris','Spanish':'qataríes','Portuguese':'Qataris','Italian':'Qatar','French':'Qatariens','German':'Katarer'},
{'English':'Romanians','Spanish':'rumanos','Portuguese':'romenos','Italian':'romeni','French':'Roumains','German':'Rumänen'},
{'English':'Russians','Spanish':'rusos','Portuguese':'russos','Italian':'russi','French':'les Russes','German':'Russen'},
{'English':'Rwandans, Banyarwanda','Spanish':'Ruandeses, banyarwanda','Portuguese':'Ruandeses, Banyarwanda','Italian':'Ruandesi, Banyarwanda','French':'Rwandais, Banyarwanda','German':'Ruander, Banyarwanda'},
{'English':'São Toméans','Spanish':'São Toméans','Portuguese':'São-tomenses','Italian':'São Toméans','French':'São Toméans','German':'São Tomeans'},
{'English':'Saudis, Saudi Arabians','Spanish':'Saudíes, saudíes','Portuguese':'Sauditas, da Arábia Saudita','Italian':'Sauditi, sauditi','French':'Saoudiens, Saoudiens','German':'Saudis, Saudis'},
{'English':'Scot, Scotsmen, Scotswomen','Spanish':'Escocés, escoceses, Scotswomen','Portuguese':'Scot, Scotsmen, Scotswomen','Italian':'Scot, scozzesi, Scotswomen','French':'Scot, scotsmen, Scotswomen','German':'Scot, Scotsmen, Scotswomen'},
{'English':'Senegalese','Spanish':'senegalés','Portuguese':'senegalesa','Italian':'senegalese','French':'Sénégalais','German':'senegalesisch'},
{'English':'Serbs, Serbians','Spanish':'Servios, servios','Portuguese':'Sérvios, sérvios','Italian':'Serbi, serbi','French':'Serbes, Serbes','German':'Serben, Serben'},
{'English':'Singaporeans','Spanish':'Singapur','Portuguese':'cingapurianos','Italian':'Singapore','French':'Singapouriens','German':'Singapurer'},
{'English':'Slovaks, Slovakians','Spanish':'Eslovacos, eslovacos','Portuguese':'Eslovacos, eslovacos','Italian':'Slovacchi, slovacchi','French':'Slovaques, Slovaques','German':'Slowaken, Slowaken'},
{'English':'Slovenes','Spanish':'eslovenos','Portuguese':'eslovenos','Italian':'sloveni','French':'Slovènes','German':'Slowenen'},
{'English':'South Africans','Spanish':'sudafricanos','Portuguese':'sul-africanos','Italian':'sudafricani','French':'Sud-Africains','German':'Südafrikaner'},
{'English':'Spaniards','Spanish':'españoles','Portuguese':'espanhóis','Italian':'spagnoli','French':'Espagnols','German':'Spanier'},
{'English':'Sudanese','Spanish':'sudanés','Portuguese':'sudanês','Italian':'sudanese','French':'soudanais','German':'Sudanese'},
{'English':'Swedes','Spanish':'suecos','Portuguese':'suecos','Italian':'svedesi','French':'Suédois','German':'Schweden'},
{'English':'Swiss','Spanish':'suizo','Portuguese':'suíço','Italian':'svizzero','French':'Suisse','German':'schweizerisch'},
{'English':'Syrians','Spanish':'sirios','Portuguese':'sírios','Italian':'siriani','French':'Syriens','German':'Syrer'},
{'English':'Taiwanese','Spanish':'taiwanés','Portuguese':'Taiwan','Italian':'taiwanese','French':'taïwanaise','German':'Taiwanese'},
{'English':'Tanzanians','Spanish':'tanzanos','Portuguese':'tanzanianos','Italian':'tanzaniani','French':'Tanzaniens','German':'Tansanier'},
{'English':'Thai','Spanish':'tailandés','Portuguese':'tailandês','Italian':'tailandese','French':'thaïlandais','German':'thailändisch'},
{'English':'Timorese','Spanish':'timorenses','Portuguese':'timorense','Italian':'Timor','French':'timorais','German':'Timorese'},
{'English':'Turks','Spanish':'turcos','Portuguese':'turcos','Italian':'turchi','French':'Turcs','German':'Türken'},
{'English':'Ugandans','Spanish':'ugandeses','Portuguese':'ugandenses','Italian':'ugandesi','French':'Ougandais','German':'Ugander'},
{'English':'Ukrainians','Spanish':'ucranianos','Portuguese':'ucranianos','Italian':'ucraini','French':'Ukrainiens','German':'Ukrainer'},
{'English':'Emiratis, Emirians, Emiri','Spanish':'Emiratíes, Emirians, Emiri','Portuguese':'Emiratis, Emirians, Emiri','Italian':'Emiratis, Emirians, Emiri','French':'Emiratis, Emirians, Emiri','German':'Emiratis, Emirians, Emiri'},
{'English':'Britons, British','Spanish':'Británicos, británica','Portuguese':'Britânicos, British','Italian':'Britannici, britannico','French':'Britanniques, britannique','German':'Briten, British'},
{'English':'Americans','Spanish':'americanos','Portuguese':'americanos','Italian':'Gli americani','French':'les Américains','German':'Amerikaner'},
{'English':'Uruguayans','Spanish':'uruguayos','Portuguese':'uruguaios','Italian':'uruguaiani','French':'uruguayens','German':'Uruguayer'},
{'English':'Venezuelans','Spanish':'venezolanos','Portuguese':'venezuelanos','Italian':'venezuelani','French':'Vénézuéliens','German':'Venezolaner'},
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
