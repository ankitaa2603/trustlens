-- Migration: Add onboarding_completed to existing profiles table
-- Run if you already created the profiles table without this column

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
