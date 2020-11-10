`.prettierrc` file:

```jsx
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": false,
  "bracketSpacing": false,
  "plugins": ["prettier-plugin-solidity"] // needed for command line execution, remove for vscode
}
```

for VS Code `format on save` to work, It seems I need to

1.  `npm init -y`
2.  `npm i -D prettier prettier-plugin-solidity`
3.  re-initialize prettier VS code solidity formatter (after manually deleting the below lines at the start from settings.json)

```jsx
"[solidity]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
```
