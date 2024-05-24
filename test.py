import os
import json
import openai
from llm_file import parse_text_file, get_chat_completion  # Import functions from llm.py

# Read API key from environment variable
openai_api_key = os.environ.get("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# Set the API key
openai.api_key = openai_api_key

# Path to your text file
file_path = '/content/Supplier FAQs.txt'
jsonl_file_path = '/content/eudr_data.jsonl'

# Parse the text file (retrieved from llm.py)
parsed_data = parse_text_file(file_path)

# Convert parsed data to JSONL format and save to file
with open(jsonl_file_path, 'w') as jsonl_file:
    for entry in parsed_data:
        jsonl_file.write(json.dumps(entry) + '\n')

print(f"Data has been converted to JSONL format and saved to {jsonl_file_path}")

# Load the JSONL data (retrieved from llm.py)
with open("eudr_data.jsonl", "r") as file:
    data = [json.loads(line) for line in file]

# Example usage (retrieved from llm.py)
for entry in data:
    prompt = entry['prompt']
    completion = get_chat_completion(prompt)
    print(f"Prompt: {prompt}\nCompletion: {completion}\n")
