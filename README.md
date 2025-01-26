### Reflection

![wire frame large screen](<Screenshot 2025-01-26 143142.png>)

![wire frame small screen](<Screenshot 2025-01-26 143527.png>)

- I manage to pretty much achieve all requirements and some stretch goals.

- Yes I wasn't able to get my +1 animation to work when cookie was clicked like I did in week 3, so I left it and focused on other goals.

- LocalStorage was a nightmare to implement. Getting the game-state to go into `localStorage` was not a problem, but getting it from `localStorage` was an issue because it wouldn't sync using `useEffect` or when the `useEffect` fires the game-state would be `null` so it crashed, then after a little research [useState lazy function](https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/). Using the lazy function in `useState` made sure that getting from `localStorage` runs as the component mounts, as to `useEffect` fires after component mounts, also the lazy function makes sure that the state is run once and once only.

Here are 3 resources I used for `localStorage`  
 [dark mode](https://selftaughttxg.com/2023/05-23/learn-local-storage-in-react-create-a-light-and-dark-theme-switcher-application/#:~:text=Working%20with%20local%20storage%20in%20React,-To%20work%20with&text=We%20use%20the%20useState%20hook,user%20toggles%20the%20theme%20value)

[for game state](https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/)

[lazy function](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)

### Problems I faced

I split components into seperate files the best I could but not having all the css in one file I found a pain having to keep going back and forth between files.

I also wanted to have a way for the user to be able to see how many upgrades they had purchased, I knew that I would need a seperate state just to hold the names and count of the ugrades. I had to use this in my purchase

```
setUpgradesCount((prev) =>
       prev.map((upgradesCount) =>
         upgradesCount.id === upgrade.id
           ? { ...upgradesCount, count: upgradesCount.count + 1 }
           : upgradesCount
       )
     );
```

I was able to translate this from the react docs in the updating arrays section. Then I tried to pass the whole upgradesCount state down to the UpgradeItem component and then render it but I forgot it was an array, so in theory I was then trying to render `upgradesCount.count` in a p tag and react was giving me errors, then I realised I just need that specific object of that upgradeCount and that is where this came in
`const count =
                upgradesCount.find((item) => item.id === upgrade.id).count || 0;
`
which solved the trick, and I was able to pass that down as a prop.

Another issue I faced was that `localStorage` was getting game-state as intended in dev mode, but when I deployed on Render the `localStorage` was coming up as `null` even with the lazy function in state, so I had to do a little optional chaining, I did think using nullish coalescing (??) would work because if storage is null then it would return default states for `cps` and `totalCookies` if null, so I settled for optional chaining combined with or operator (||), what optional chaining does will let the operation carry on if the object doesn't exist.

### Extras

I have used some sounds so when purchase upgrade it gives you a ka-ching, a popping noise when you click the cookie and a reset noise.

I also made a custom `useFetch` hook, but that was very easy, I wanted to make the App.jsx less cluttered, but did not make much difference. I really wanted to make a custom hook for storage but at this point my brain was melting.

Error handling for not enough cookies started of as a piece of state that got set to true of not enough cookies in a `setTimeout` that rendered a little message on screen and then another `setTimeout` that set state to false and message disappeared, but I removed it all and made it so if toal cookie value was less than `upgrade.cost` then the buy button for each upgrade would be disabled and it has the not allowed cursor.

I also made a footer with my name and link to github, the github icon uses React Icons.

All things I wanted to do are in `considerations.md`.

### What I am not happy with

I could have used the upgradesCount and set that into the gameState in `localStorage`, but it worked the way I did it so I did not want to break anything.

A little unhappy with `App.jsx` as a little cluttered, but I know that most components needed to share the state.

Not getting my animation done has annoyed me.

### Overall

I am 70% happy with this project, I did base it off of week 3, maybe with more time things could have worked out better.

Look forward to your feedback.
