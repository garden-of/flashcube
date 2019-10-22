from django.db import migrations

TOWER_DATA = {
    'name': 'Bodyparts',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
        {'English':'the body','Spanish':'el cuerpo','Portuguese':'o corpo','Italian':'il corpo','French':'le corps','German':'der Körper, die bodys'},
        {'English':'the eye','Spanish':'el ojo','Portuguese':'o olho','Italian':'l\'occhio','French':'l\'oeil','German':'das Auge, die Augen'},
        {'English':'the cheek','Spanish':'la mejilla','Portuguese':'a bochecha','Italian':'la guancia','French':'la joue','German':'die Wange, die Wangen'},
        {'English':'rhe eyebrow','Spanish':'ceja RHE','Portuguese':'rhe sobrancelha','Italian':'sopracciglio rhe','French':'sourcil rhe','German':'rhe Augenbraue braue~~POS=HEADCOMP, rhe Augenbrauen'},
        {'English':'the eyelash','Spanish':'las pestañas','Portuguese':'a pestana','Italian':'il ciglio','French':'le cil','German':'die Wimpern, die eyelashs'},
        {'English':'the jaw','Spanish':'la mandíbula','Portuguese':'a mandíbula','Italian':'la ganascia','French':'la machoire','German':'Der Kiefer, die Backen'},
        {'English':'the mouth','Spanish':'la boca','Portuguese':'a boca','Italian':'la bocca','French':'la bouche','German':'der Mund, die Mündungen'},
        {'English':'the chin','Spanish':'la barbilla','Portuguese':'o queixo','Italian':'il mento','French':'le menton','German':'das Kinn, die Kinne'},
        {'English':'the ear','Spanish':'la oreja','Portuguese':'a orelha','Italian':'l\'orecchio','French':'l\'oreille','German':'das Ohr, die Ohren'},
        {'English':'the inner ear','Spanish':'el oído interno','Portuguese':'o ouvido interno','Italian':'l\'orecchio interno','French':'l\'oreille interne','German':'das Innenohr, die inneren Ohren'},
        {'English':'the skull','Spanish':'la calavera','Portuguese':'a caveira','Italian':'il teschio','French':'le crâne','German':'der Schädel, der Schädel'},
        {'English':'the mind','Spanish':'la mente','Portuguese':'a mente','Italian':'la mente','French':'l\'esprit','German':'der Verstand, die Köpfe'},
        {'English':'the head','Spanish':'la cabeza','Portuguese':'a cabeça','Italian':'la testa','French':'la tête','German':'der Kopf, die Köpfe'},
        {'English':'the hair','Spanish':'el cabello','Portuguese':'o cabelo','Italian':'i capelli','French':'les cheveux','German':'die Haare, Die Haare'},
        {'English':'the brain','Spanish':'el cerebro','Portuguese':'o cérebro','Italian':'il cervello','French':'le cerveau','German':'das Gehirn, die Gehirne'},
        {'English':'the forehead','Spanish':'la frente','Portuguese':'a testa','Italian':'La fronte','French':'le front','German':'die Stirn, die Stirnen'},
        {'English':'the beard','Spanish':'la barba','Portuguese':'a barba','Italian':'la barba','French':'la barbe','German':'der Bart, die Bärte'},
        {'English':'the mustache','Spanish':'el bigote','Portuguese':'o bigode','Italian':'i baffi','French':'la moustache','German':'der Schnurrbart, die Schnurrbärte'},
        {'English':'the iris','Spanish':'ellos son','Portuguese':'a íris','Italian':'il loro è','French':'l\'iris','German':'die Iris, die iriss'},
        {'English':'the neck','Spanish':'el cuello','Portuguese':'o pescoço','Italian':'il collo','French':'le cou','German':'der Hals, die Hälse'},
        {'English':'the throat','Spanish':'la garganta','Portuguese':'a garganta','Italian':'la gola','French':'la gorge','German':'die Kehle, die Kehlen'},
        {'English':'the shoulder','Spanish':'el hombro','Portuguese':'o ombro','Italian':'la spalla','French':'L\'épaule','German':'die Schulter, die Schultern'},
        {'English':'the arm','Spanish':'el brazo','Portuguese':'o braço','Italian':'il braccio','French':'le bras','German':'der Arm, die Arme'},
        {'English':'the forearm','Spanish':'el antebrazo','Portuguese':'antebraço','Italian':'l\'avambraccio','French':'l\'avant-bras','German':'der Unterarm, die Unterarme'},
        {'English':'the wrist','Spanish':'la muñeca','Portuguese':'pulso','Italian':'il polso','French':'le poignet','German':'das Handgelenk, die Handgelenke'},
        {'English':'the hand','Spanish':'la mano','Portuguese':'a mão','Italian':'la mano','French':'la main','German':'die Hand, die Hände'},
        {'English':'the finger','Spanish':'el dedo','Portuguese':'o dedo','Italian':'il dito','French':'le doigt','German':'der Finger, die Finger'},
        {'English':'the knuckle','Spanish':'el nudillo','Portuguese':'a junta','Italian':'la nocca','French':'l\'articulation','German':'der Achsschenkel, die Knöchel'},
        {'English':'the tooth','Spanish':'el diente','Portuguese':'o dente','Italian':'il dente','French':'la dent','German':'der Zahn, die tooths'},
        {'English':'the lip','Spanish':'el labio','Portuguese':'o lábio','Italian':'il labbro','French':'la lèvre','German':'die Lippe, Die Lippen'},
        {'English':'the elbow','Spanish':'el codo','Portuguese':'o cotovelo','Italian':'il gomito','French':'le coude','German':'der Ellbogen, die Ellbogen'},
        {'English':'the tongue','Spanish':'la lengua','Portuguese':'a língua','Italian':'la lingua','French':'la langue','German':'die Zunge, die Zungen'},
        {'English':'the thumb','Spanish':'el pulgar','Portuguese':'o polegar','Italian':'il pollice','French':'le pouce','German':'der Daumen, die Daumen'},
        {'English':'the pinkie','Spanish':'el meñique','Portuguese':'o dedo mindinho','Italian':'il mignolo','French':'le petit doigt','German':'die kleinen Finger, die pinkies'},
        {'English':'the index finger','Spanish':'el dedo índice','Portuguese':'o dedo indicador','Italian':'il dito indice','French':'l\'index','German':'der Zeigefinger, die Zeigefinger'},
        {'English':'the middle finger','Spanish':'el dedo medio','Portuguese':'o dedo médio','Italian':'il dito medio','French':'le doigt du milieu','German':'der Mittelfinger, die Mittelfinger'},
        {'English':'the skin','Spanish':'la piel','Portuguese':'a pele','Italian':'la pelle','French':'la peau','German':'die Haut, die Häute'},
        {'English':'the chest','Spanish':'el pecho','Portuguese':'peito','Italian':'il petto','French':'la poitrine','German':'die Brust, Truhen'},
        {'English':'the nipple','Spanish':'el pezón','Portuguese':'o mamilo','Italian':'il capezzolo','French':'le mamelon','German':'der Nippel, die Brustwarzen'},
        {'English':'the rib','Spanish':'la costilla','Portuguese':'a costela','Italian':'la costola','French':'la nervure','German':'die Rippe, die Rippen'},
        {'English':'the stomach','Spanish':'el estómago','Portuguese':'o estômago','Italian':'lo stomaco','French':'l\'estomac','German':'der Magen, die Mägen'},
        {'English':'the belly button','Spanish':'el ombligo','Portuguese':'do umbigo','Italian':'l\'ombelico','French':'le nombril','German':'der Bauchnabel, die Bauch-Tasten'},
        {'English':'the back','Spanish':'la parte de atrás','Portuguese':'a parte de trás','Italian':'il retro','French':'l\'arrière','German':'der Rücken, der Rücken'},
        {'English':'the waist','Spanish':'la cintura','Portuguese':'a cintura','Italian':'il punto vita','French':'la taille','German':'die Taille, die Einschnürungen'},
        {'English':'the butt','Spanish':'la culata','Portuguese':'a coronha','Italian':'il calcio','French':'la crosse','German':'der Hintern, die Füße'},
        {'English':'the glute','Spanish':'el glúteo','Portuguese':'o glúteo','Italian':'il gluteo','French':'le glute','German':'die glute, die glutes'},
        {'English':'the anus','Spanish':'el ano','Portuguese':'ânus','Italian':'l\'ano','French':'l\'anus','German':'der Anus, die anuss'},
        {'English':'the thigh','Spanish':'el muslo','Portuguese':'a coxa','Italian':'la coscia','French':'la cuisse','German':'die Hüfte, die Schenkel'},
        {'English':'the knee','Spanish':'la rodilla','Portuguese':'o joelho','Italian':'il ginocchio','French':'le genou','German':'das Knie, die Knie'},
        {'English':'the shin','Spanish':'la espinilla','Portuguese':'a canela','Italian':'lo stinco','French':'le tibia','German':'das Schien, die Schienbeine'},
        {'English':'the leg','Spanish':'la pierna','Portuguese':'a perna','Italian':'la gamba','French':'la jambe','German':'das Bein, die Beine'},
        {'English':'the foot','Spanish':'el pie','Portuguese':'o pé','Italian':'il piede','French':'le pied','German':'der Fuß, die Füß'},
        {'English':'the ankle','Spanish':'el tobillo','Portuguese':'o tornozelo','Italian':'la caviglia','French':'la cheville','German':'der Knöchel, die Knöchel'},
        {'English':'the toe','Spanish':'el dedo del pié','Portuguese':'o dedo do pé','Italian':'la punta','French':'le doigt de pied','German':'die Zehe, die Zehen'},
        {'English':'the heel','Spanish':'el talón','Portuguese':'o calcanhar','Italian':'il tacco','French':'le talon','German':'die Ferse, die Fersen'},
        {'English':'the arch','Spanish':'el arco','Portuguese':'o arco','Italian':'l\'arco','French':'l\'arc','German':'der Bogen, die archs'},
        {'English':'the armpit','Spanish':'la axila','Portuguese':'axila','Italian':'l\'ascella','French':'l\'aisselle','German':'die Achselhöhle, die Achselhöhlen'},
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
        ('towers', '0011_animals1_tower'),
    ]

    operations = [
        migrations.RunPython(create_tower)
    ]
