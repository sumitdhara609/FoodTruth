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

### 3. Validation Layer

- Zod input schema
- Field-level validation errors
- Safe report generation wrapper
- Validation demo script

The validation layer protects the FoodTruth Engine from malformed input before analysis begins.

The UI should never call the raw report engine directly. User-submitted data should pass through the validated wrapper first.

### 4. Data Layer

- Supabase PostgreSQL
- Saved products
- Analysis reports
- Claim flags
- Ingredient flags

### 5. Quality Layer

- TypeScript
- Validation
- Unit tests
- CI checks

## Engineering Principle

The intelligence engine should work independently of the UI.

Given a structured food label input, the engine should return a structured FoodTruth report.