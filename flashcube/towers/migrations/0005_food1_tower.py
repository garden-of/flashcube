from django.db import migrations

TOWER_DATA = {
    'name': 'Sports',
    'categories': (
        'English',
        'Spanish',
        'Portuguese',
        'Italian',
        'French',
        'German',
    ),
    'cubes': (
        {'English':'the soccer','Spanish':'el fútbol','Portuguese':'o futebol','Italian':'il calcio','French':'le football','German':'Fußball, die soccers'},
        {'English':'the golf','Spanish':'el golf','Portuguese':'o golfe','Italian':'il campo','French':'le golf','German':'der Golf, der Golf spielt'},
        {'English':'the golf clubs','Spanish':'los palos de golf','Portuguese':'os clubes de golfe','Italian':'le mazze da golf','French':'les clubs de golf','German':'die Golfclubs, der Golf clubss'},
        {'English':'the tennis','Spanish':'el tenis','Portuguese':'O tênis','Italian':'il tennis','French':'le tennis','German':'das Tennis, die tenniss'},
        {'English':'the basket','Spanish':'la cesta','Portuguese':'O cesto','Italian':'il cestino','French':'le panier','German':'der Korb, die Körbe'},
        {'English':'the basketball','Spanish':'el baloncesto','Portuguese':'o basquete','Italian':'La pallacanestro','French':'le basketball','German':'der Basketball, die Basketball'},
        {'English':'the racket','Spanish':'la raqueta','Portuguese':'a raquete','Italian':'la racchetta','French':'la raquette','German':'der Schläger, die Schläger'},
        {'English':'the net','Spanish':'la red','Portuguese':'a rede','Italian':'la rete','French':'le net','German':'das Netz, die Netze'},
        {'English':'the ball','Spanish':'la pelota','Portuguese':'a bola','Italian':'la palla','French':'le ballon','German':'der Ball, die Bälle'},
        {'English':'the player','Spanish':'el jugador','Portuguese':'o jogador','Italian':'il giocatore','French':'le joueur','German':'der Spieler, die Spieler'},
        {'English':'the volleyball','Spanish':'el voleibol','Portuguese':'o voleibol','Italian':'pallavolo','French':'le volleyball','German':'der Volleyball, die Volley'},
        {'English':'the swimming','Spanish':'la natacion','Portuguese':'a natação','Italian':'il nuoto','French':'la nage','German':'das Schwimmen, die swimmings'},
        {'English':'the cycling','Spanish':'el ciclismo','Portuguese':'o ciclismo','Italian':'il ciclismo','French':'le cyclisme','German':'das Radfahren, die cyclings'},
        {'English':'the hockey','Spanish':'el hockey','Portuguese':'o hóquei','Italian':'l\'hockey','French':'hockey','German':'das Hockey, das hockey'},
        {'English':'the skiing','Spanish':'las pistas de esquí','Portuguese':'o esqui','Italian':'lo sci','French':'le ski','German':'das Skifahren, die skiings'},
        {'English':'the surfing','Spanish':'el surf','Portuguese':'o surf','Italian':'la navigazione','French':'le surf','German':'das Surfen, die surfings'},
        {'English':'the uniform','Spanish':'el uniforme','Portuguese':'o uniforme','Italian':'l\'uniforme','French':'l\'uniforme','German':'die Uniform, die Uniformen'},
        {'English':'the decision','Spanish':'la decisión','Portuguese':'a decisão','Italian':'la decisione','French':'la décision','German':'die Entscheidung, die Entscheidungen'},
        {'English':'the marathon','Spanish':'El maratón','Portuguese':'a maratona','Italian':'la maratona','French':'le marathon','German':'der Marathon, die Marathons'},
        {'English':'the chess','Spanish':'el ajedrez','Portuguese':'o xadrez','Italian':'gli scacchi','French':'le jeu d\'échecs','German':'das Schachspiel, die chesss'},
        {'English':'the championship','Spanish':'el campeonato','Portuguese':'o Campeonato','Italian':'il campionato','French':'le championnat','German':'die Meisterschaft, die Meisterschaften'},
        {'English':'the race','Spanish':'la raza','Portuguese':'a corrida','Italian':'la gara','French':'la course','German':'das Rennen, die Rennen'},
        {'English':'the game','Spanish':'el juego','Portuguese':'o jogo','Italian':'il gioco','French':'le jeu','German':'das Spiel, die Spiele'},
        {'English':'the fight','Spanish':'la pelea','Portuguese':'a luta','Italian':'la lotta','French':'le combat','German':'der Kampf, die Kämpfe'},
        {'English':'the bullfighting','Spanish':'las corridas de toros','Portuguese':'o touradas','Italian':'la corrida','French':'la tauromachie','German':'der Stierkampf, die Stierkämpfen'},
        {'English':'the field','Spanish':'el campo','Portuguese':'o campo','Italian':'il campo','French':'le champ','German':'das Feld, die Felder'},
        {'English':'the club','Spanish':'el club','Portuguese':'o clube','Italian':'il club','French':'le club','German':'der Klub, Die Clubs'},
        {'English':'the court','Spanish':'La corte','Portuguese':'O tribunal','Italian':'la Corte','French':'le tribunal','German':'das Gericht, die Gerichte'},
        {'English':'the stadium','Spanish':'el estadio','Portuguese':'o estádio','Italian':'lo stadio','French':'le stade','German':'das Stadium, die Stadien'},
        {'English':'the fan','Spanish':'el admirador','Portuguese':'o fã','Italian':'il fan','French':'le fan','German':'der Fan, Die Fans'},
        {'English':'the referee','Spanish':'el arbitro','Portuguese':'o árbitro','Italian':'l\'arbitro','French':'l\'arbitre','German':'der Schiedsrichter, Schiedsrichter'},
        {'English':'the athlete','Spanish':'el atleta','Portuguese':'O atleta','Italian':'l\'atleta','French':'l\'athlète','German':'der Athlet, die Athleten'},
        {'English':'the champion','Spanish':'el campeón','Portuguese':'o campeão','Italian':'il campione','French':'le champion','German':'der Meister, die Meister'},
        {'English':'the national team','Spanish':'el equipo nacional','Portuguese':'a equipa nacional','Italian':'la nazionale','French':'l\'équipe nationale','German':'die Nationalmannschaft, die Nationalmannschaften'},
        {'English':'the team','Spanish':'el equipo','Portuguese':'O time','Italian':'Il gruppo','French':'l\'équipe','German':'Das Team, die Mannschaften'},
        {'English':'the coach','Spanish':'el entrenador','Portuguese':'O Treinador','Italian':'l\'allenatore','French':'l\'entraîneur','German':'der Trainer, die coachs'},
        {'English':'the diving','Spanish':'el buceo','Portuguese':'o mergulho','Italian':'le immersioni','French':'la plongée sous-marine','German':'das Tauchen, die Tauchgänge'},
        {'English':'to dive','Spanish':'bucear','Portuguese':'mergulhar','Italian':'immergersi','French':'plonger','German':'Tauchen, In den Tauchgängen'},
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
