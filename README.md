# Battleship.FRONTEND
## Online Battleship Game Simulator

A full-stack application that allows users to play a simulation based on the board game Battleship. Utilizes secure authentication to verify user account creation and log-in. Once logged in, users can engage in games against a computer. Game state can be maintained across multiple sessions. Users will also be able to track their wins and losses.

## MVP features
- A user can create an account
- A user can login with secure authentication
- A user can play a game of battleship against a computer opponent
    - A user can place ships upon the start of a game.
    - Turns alternate between the user and computer.
    - A turn consists of selecting a space on a grid, and reutrning whether that space contained an enenmy ship.
    - If a turn is successful, that player that fired continutes their turn.
    - If a turn is unsucesssful, the turn ends and it is the other players turn.
    - If all enemy ships have been hit, game over player wins.
- A user can view their wins and losses
- A user can logout
- A visually appealing frontend to play the game



# Entity Relationship Diagram
![Battleship ERD](https://github.com/user-attachments/assets/499b4dd4-f173-4f75-92b2-abd554b4f551)


# Stretch Goals
- A user can play a game of battleship against a player opponent
- A user can continue a previously unfinished computer game after logging in
- A user can end a game without completing it (count as loss)
- Animations for different player actions (hit, miss, etc.)
- Sound effects for different player actions (hit,  miss, etc.)
- Change Board Size dynamically

# Project Management
Project tasks are managed through Github Projects and team communication is managed through Microsoft Teams. 
Tasks were added to Github Projects and task will be assigned in Daily Teams meetings. 

## Work Distribution
- Ethan: Back End
- John: Back End
- Alex: User Auth / Back End 
- Vamsi: Dev Ops / Front End / Azure
- Prabveer: Front End
- Jean: Front End
- Justin: Testing


