# OzArcade - Project Design

## 1. Concept

OzArcade is a modular web platform containing arcade-style games that run directly in the browser.

The main page acts as a game catalog. Each playable title has its own page and implementation.

## 2. Main Goal

Build an arcade platform that can grow progressively without requiring existing games to be unnecessarily modified whenever a new title is added.

## 3. First Functional Version

The first major version should contain:

- Main arcade catalog
- Fully playable Snake
- Fully playable Brick Breaker
- Pong displayed as Coming Soon
- Maze Chase displayed as Coming Soon
- Navigation between games and the catalog
- High scores stored with LocalStorage
- Consistent visual design
- GitHub Pages deployment

## 4. Navigation

The basic navigation flow is:

```text
OzArcade Catalog
       ↓
Selected Game
       ↓
Back to Catalog
```

Each game will have its own page.

## 5. Catalog

The root `index.html` will not contain a game directly.

It will display game cards containing information such as:

- Title
- Cover image
- Short description
- Availability
- High score when applicable
- Play button

Game information should preferably be stored as data in `catalog.js` so new titles can be added with minimal changes.

## 6. Architecture

Games will remain reasonably independent.

Expected structure:

```text
games/
├── snake/
├── brick-breaker/
├── pong/
└── ...
```

A game may contain:

```text
index.html
game.css
game.js
GDD.md
```

Shared functionality will only be extracted when genuine reuse appears.

## 7. Shared Code

Do not create abstractions prematurely.

Code should be moved to `shared/` when:

- multiple games use it;
- meaningful duplication exists;
- sharing the implementation makes maintenance simpler.

Potential future shared systems include:

- LocalStorage
- audio
- controls

## 8. Persistence

LocalStorage will store non-sensitive game information and preferences.

Examples:

```text
ozarcade_snake_highscore
ozarcade_brickbreaker_highscore
ozarcade_volume
```

## 9. Visual Direction

OzArcade will use a modern arcade aesthetic influenced by:

- classic arcades
- pixel art
- neon interfaces
- CRT displays

The interface should avoid excessive flashing, glitch effects or visual elements that reduce readability.

## 10. Responsive Design

Desktop is the initial priority.

The catalog should still adapt reasonably to different screen sizes using technologies such as CSS Grid, Flexbox and media queries.

## 11. Initial Games

### Snake

The first game developed for OzArcade.

It will help validate:

- game architecture
- navigation
- controls
- scoring
- LocalStorage integration

### Brick Breaker

The second playable game.

It will introduce concepts such as:

- Canvas
- continuous movement
- collisions
- game loops
- levels

### Pong

Initially displayed as Coming Soon.

### Maze Chase

A maze-based chase game inspired by classic arcade mechanics while using an original implementation and assets.

Initially displayed as Coming Soon.

## 12. Reference Project

Henry's Asteroids project may be studied as a technical reference for concepts such as Canvas, game loops and collision detection.

It is not part of OzArcade and must not be used as the project's foundation or template.

OzArcade implementations will be written specifically for this project.

## 13. Development Priorities

When choosing between solutions, prioritize:

1. Functionality
2. Organization
3. Clarity
4. Maintainability
5. Scalability
6. Visual quality
7. Technical sophistication