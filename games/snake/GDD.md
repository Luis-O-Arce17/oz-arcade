# Snake - Game Design Document

## 1. Overview

Snake is the first playable game developed for OzArcade.

The player controls a snake that moves continuously across a grid. The objective is to collect food, grow in length and achieve the highest possible score without colliding with the walls or the snake's own body.

This first version will prioritize simple mechanics, responsive controls and maintainable code.

## 2. Game Objective

The objective is to obtain the highest score possible.

The player earns points by collecting food.

Each collected food item:

- increases the score;
- increases the snake's length;
- causes a new food item to appear.

The game continues until the snake collides with a wall or with its own body.

## 3. Game Board

Snake will use a grid-based board rendered using HTML Canvas.

The board will be divided into equally sized cells.

The snake and food will always occupy positions aligned to this grid.

Initial proposed configuration:

- Board: 20 x 20 cells
- Cell size: 25 pixels
- Canvas size: 500 x 500 pixels

These values may be adjusted during implementation if necessary.

## 4. Player

The player controls the snake.

The snake starts near the center of the board with an initial length of three segments.

Initial direction:

Right.

The snake moves automatically at a constant interval.

The player only controls its direction.

## 5. Controls

Supported controls:

| Action | Keyboard |
| --- | --- |
| Move Up | W / Arrow Up |
| Move Down | S / Arrow Down |
| Move Left | A / Arrow Left |
| Move Right | D / Arrow Right |
| Pause / Resume | P |

The snake cannot immediately reverse direction.

Examples:

- Moving right cannot immediately change to left.
- Moving up cannot immediately change to down.

This prevents the snake from instantly colliding with itself.

## 6. Food

One food item will exist on the board at a time.

When the snake eats the food:

- the player receives 10 points;
- the snake grows by one segment;
- new food is generated.

Food must never spawn inside the snake's body.

## 7. Scoring

Normal food:

+10 points

The current score will be visible while playing.

The highest score will also be displayed.

## 8. High Score

The highest score will be stored using LocalStorage.

Storage key:

```text
ozarcade_snake_highscore
```

When a game ends:

1. Compare the current score with the saved high score.
2. If the current score is higher, save the new value.
3. Display the updated high score.

No account or server is required.

## 9. Difficulty

The snake will gradually become faster as the player progresses.

The initial version will increase speed according to score or number of collected food items.

The exact progression will be adjusted during testing so the game becomes more difficult without becoming unfair too quickly.

A minimum movement interval will prevent the game from becoming uncontrollably fast.

## 10. Collisions

The game ends if the snake:

- hits the left wall;
- hits the right wall;
- hits the top wall;
- hits the bottom wall;
- hits its own body.

Wall wrapping will not be used in the first version.

## 11. Game States

Snake will use the following main states:

```text
READY
PLAYING
PAUSED
GAME_OVER
```

### READY

The game is loaded but has not started.

The player can see the board and start the game.

### PLAYING

The snake moves and the game accepts directional input.

### PAUSED

Movement stops.

The player can resume the game.

### GAME_OVER

Movement stops and the final score is displayed.

The player can:

- play again;
- return to the OzArcade catalog.

## 12. Interface

The Snake page should display:

- OzArcade / Snake title;
- current score;
- high score;
- game canvas;
- game status;
- controls;
- restart option;
- return to catalog option.

The visual style should remain consistent with the main OzArcade interface.

## 13. Language Support

Snake should eventually support the same languages as the main OzArcade catalog:

- English
- Spanish

Translatable interface elements may include:

- Score
- High Score
- Start
- Pause
- Resume
- Game Over
- Play Again
- Back to Arcade
- Controls

The translation system should only be extracted into shared code when reuse between the catalog and games makes that beneficial.

## 14. Audio

Audio is not required for the first playable implementation.

Possible future additions:

- food collection sound;
- Game Over sound;
- menu sound;
- optional background music.

Audio should never autoplay unexpectedly.

## 15. Visual Direction

Snake should follow OzArcade's modern arcade identity.

Possible visual elements:

- dark background;
- grid-based game board;
- high-contrast snake;
- clearly visible food;
- subtle glow;
- restrained arcade effects.

Gameplay clarity is more important than decorative effects.

## 16. Technical Direction

The game will primarily use:

- HTML
- CSS
- JavaScript
- HTML Canvas
- LocalStorage

The implementation should conceptually separate:

- game state;
- controls;
- movement;
- collision detection;
- food generation;
- scoring;
- rendering;
- game reset.

Avoid unnecessary global variables and excessively large functions.

## 17. First Playable Version

The first playable version must include:

- canvas board;
- snake rendering;
- automatic movement;
- WASD controls;
- arrow controls;
- food spawning;
- snake growth;
- scoring;
- wall collision;
- self collision;
- Game Over;
- restart;
- pause;
- high score;
- return to OzArcade.

## 18. Possible Future Features

Features that may be considered later:

- difficulty selection;
- different board sizes;
- alternative visual themes;
- special food;
- obstacles;
- sound effects;
- mobile controls;
- achievements.

These features are outside the scope of the initial version.