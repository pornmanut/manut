# Testing Rules

## User Testing Requirement

**ALWAYS ask the user to test the application instead of running `npm run dev` yourself.**

When working on web applications or any code that requires a development server:

1. **DO NOT** run `npm run dev` or similar commands yourself
2. **DO** ask the user to test the changes by running the development server themselves
3. **DO** provide clear instructions on what to test and what functionality should be working

## Example Request Template

```
Please test the application by running `npm run dev` and navigating to the appropriate page. 

Check that:
- [Specific functionality 1]
- [Specific functionality 2]
- [Any buttons/forms are working]
- [No console errors]

Let me know if you encounter any issues or if everything is working as expected.
```

## Rationale

This approach:
- Respects the user's development environment
- Allows the user to see the actual behavior in their browser
- Prevents potential conflicts with running processes
- Ensures the user can verify the changes work in their specific setup
