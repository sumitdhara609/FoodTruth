# FoodTruth Architecture

FoodTruth is built as a modular label-intelligence platform.

## Core Layers

### 1. Product Interface

- Landing page
- Label analyzer
- FoodTruth report
- Product vault
- Knowledge library

### 2. Intelligence Engine

- Nutrition Load Engine
- Ingredient Clarity Engine
- Marketing Claim Risk Engine
- Serving Size Reality Engine
- FoodTruth Score Engine

### 3. Data Layer

- Supabase PostgreSQL
- Saved products
- Analysis reports
- Claim flags
- Ingredient flags

### 4. Quality Layer

- TypeScript
- Validation
- Unit tests
- CI checks

## Engineering Principle

The intelligence engine should work independently of the UI.

Given a structured food label input, the engine should return a structured FoodTruth report.