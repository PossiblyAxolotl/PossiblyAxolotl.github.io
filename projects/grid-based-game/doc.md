# Level file documentation
## File format
All files are stored as plain text as "filename.soko.txt". *(the soko part is unnecessary and simply there for identification)*

Levels are made by adding characters to the text file. Each line should have the same character count, except for the last line which contains the level title.

Ex.:
```
.@.
...
OOO
...
#&#
Cool puzzle
```

## Level elements
Depending on the character you use, a different element will show up in the level.

|Tile|Character|Description|
|----|---------|-----------|
|Blank|.|Empty tile, place it in every blank space and ensure there aren't spaces at the end of lines.|
|Wall|#|Moving objects (player, blocks) can't pass through these.|
|Ice|%|Moving objects that land on ice will keep moving unless there is a wall or block ahead.|
|Block|O|Objects pushable by the player.|
|Target|X|All targets must be covered by blocks in order to finish the level.|
|Player|@|There can only be one player, movable with WASD/IJKL/Arrows|
|Exit|&|There should only be up to one exit. The player must be over the exit in order to finish the level.|

## Loading
In order to load a level simply drag and drop the text file over the game window.

Multiple levels can be strung together by adding the path to the next level after the level title like this:
```
....
..@.
.&..
....
Cool level -> https://gist.githubusercontent.com/PossiblyAxolotl/b4bbffe197906b00a7fda85640592683/raw/897316226ea098176485dd80c0a479fedc15dbfb/level2.soko.txt
```

You must include a space on either side of the arrow in ` -> `. The next level can be hosted anywhere as long as the level can be accessed as plain text from the URL. 

Built-in levels just give a path (i.e. level1 -> levels/level2.soko.txt) as they're all hosted on the same server.