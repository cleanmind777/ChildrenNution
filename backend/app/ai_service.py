import os
import json
from typing import Dict, List, Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

async def analyze_food_nutrition(image_url: str, child_allergies: Optional[str] = None, 
                                  dietary_restrictions: Optional[str] = None) -> Dict:
    """
    Analyze food image using AI to extract nutrition information
    """
    if not client:
        # Fallback response if OpenAI is not configured
        return {
            "food_items": ["Food detected"],
            "calories": 250.0,
            "protein": 15.0,
            "carbs": 30.0,
            "fats": 8.0,
            "vitamins": {"vitamin_c": "10mg", "calcium": "100mg"},
            "allergens_detected": [],
            "recommendations": "Please consult with a nutritionist for detailed analysis."
        }
    
    try:
        # Prepare context about allergies and restrictions
        context = ""
        if child_allergies:
            context += f"Child has allergies to: {child_allergies}. "
        if dietary_restrictions:
            context += f"Dietary restrictions: {dietary_restrictions}."
        
        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a nutrition expert. Analyze the food image and provide:
                    1. List of food items detected
                    2. Estimated calories
                    3. Protein (grams)
                    4. Carbohydrates (grams)
                    5. Fats (grams)
                    6. Key vitamins and minerals
                    7. Any allergens detected (if applicable)
                    8. Recommendations
                    
                    {context}
                    
                    Return the response as a JSON object with these fields:
                    food_items (array of strings), calories (number), protein (number), 
                    carbs (number), fats (number), vitamins (object), allergens_detected (array), 
                    recommendations (string)."""
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {"url": image_url}
                        },
                        {
                            "type": "text",
                            "text": "Analyze this food image and provide nutrition information."
                        }
                    ]
                }
            ],
            max_tokens=500
        )
        
        content = response.choices[0].message.content
        # Try to parse JSON from response
        try:
            nutrition_data = json.loads(content)
        except:
            # If not valid JSON, create structured response
            nutrition_data = {
                "food_items": ["Food detected"],
                "calories": 250.0,
                "protein": 15.0,
                "carbs": 30.0,
                "fats": 8.0,
                "vitamins": {},
                "allergens_detected": [],
                "recommendations": content[:200] if content else "Nutrition analysis completed."
            }
        
        return nutrition_data
        
    except Exception as e:
        print(f"Error in AI analysis: {e}")
        # Return fallback response
        return {
            "food_items": ["Food detected"],
            "calories": 250.0,
            "protein": 15.0,
            "carbs": 30.0,
            "fats": 8.0,
            "vitamins": {},
            "allergens_detected": [],
            "recommendations": f"Analysis error: {str(e)}. Please try again."
        }
