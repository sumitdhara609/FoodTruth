# FoodTruth Scoring Model

FoodTruth Score is a transparent 0–100 score based on label clarity, nutrition load, ingredient complexity, serving-size transparency, and marketing claim alignment.

The score is educational. It is not a medical safety rating.

## Core Principle

FoodTruth does not tell people what to eat.

It helps people understand what they are buying by turning packaged food labels into clear, structured, plain-language reports.

## Score Ranges

- 85–100: Excellent Label Clarity
- 70–84: Good, with Minor Concerns
- 50–69: Mixed Profile
- 30–49: High Concern
- 0–29: Very High Concern

## Risk Levels

FoodTruth uses four risk levels across its internal engines:

- Low
- Moderate
- High
- Critical

These risk levels describe label-literacy concern, not medical danger.

## Engine Modules

### 1. Nutrition Load Engine

The Nutrition Load Engine normalizes nutrition values per 100g/ml so that small serving sizes do not hide the real density of sugar, sodium, saturated fat, calories, fiber, or protein.

It classifies:

- Sugar Load
- Sodium Load
- Saturated Fat Load
- Calorie Density
- Fiber Support
- Protein Support

### 2. Ingredient Clarity Engine

The Ingredient Clarity Engine analyzes the ingredient list and detects:

- Primary ingredient
- Ingredient count
- Sugar aliases
- Additive indicators
- Ingredient complexity

This helps users see what dominates the product and whether the ingredient list is simple or complex.

### 3. Marketing Claim Risk Engine

The Marketing Claim Risk Engine compares front-label claims with the nutrition and ingredient profile.

It checks claims such as:

- healthy
- energy
- high fiber
- high protein
- natural
- no added sugar
- low fat
- kids
- fitness
- immunity

The goal is not to accuse the product. The goal is to identify claims that may need closer verification.

### 4. Serving Size Reality Engine

The Serving Size Reality Engine checks whether the serving size may make nutrition values appear smaller than realistic consumption.

It considers:

- serving size
- pack size
- servings per pack
- serving-size-to-pack-size ratio

This is useful when a product shows nutrition values for a very small serving compared with the full pack.

### 5. FoodTruth Report Engine

The FoodTruth Report Engine combines all module outputs into a complete structured report.

It generates:

- FoodTruth Score
- Grade
- Overall Risk Level
- Nutrition Load Breakdown
- Ingredient Clarity Report
- Marketing Claim Risk Report
- Serving Size Reality Report
- Plain-English Summary
- Better Choice Checklist

## Scoring Factors

FoodTruth currently considers:

- Sugar load
- Sodium load
- Saturated fat load
- Calorie density
- Fiber support
- Protein support
- Ingredient complexity
- Additive indicators
- Marketing claim risk
- Serving size reality

## Current Penalty Logic

The current scoring model starts from 100 and subtracts penalties based on nutrition, ingredient, claim, and serving-size concerns.

Risk penalties:

- Low: 0
- Moderate: 8
- High: 18
- Critical: 28

Support penalties:

- Weak: 10
- Moderate: 4
- Good: 0

This keeps the model simple, transparent, and testable.

## Safety Boundary

FoodTruth should not say:

- This food is harmful.
- Do not eat this.
- This product causes disease.
- This food is medically unsafe.

FoodTruth should say:

- This label shows high sugar density.
- This product has a high sodium load.
- This claim may need closer verification.
- This report is for label literacy only.

## Current Status

FoodTruth Engine v0.1 includes:

- Nutrition Load Engine
- Ingredient Clarity Engine
- Marketing Claim Risk Engine
- Serving Size Reality Engine
- FoodTruth Report Engine
- Unit tests for all core modules