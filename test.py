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
file_name = 'Supplier FAQs.txt'
file_path = os.path.join(os.path.dirname(__file__), file_name)
jsonl_file_name = 'eudr_data.jsonl'
jsonl_file_path = os.path.join(os.path.dirname(__file__), jsonl_file_name)

# Parse the text file (retrieved from llm.py)
parsed_data = parse_text_file(file_path)

# Convert parsed data to JSONL format and save to file
with open(jsonl_file_path, 'w') as jsonl_file:
    for entry in parsed_data:
        jsonl_file.write(json.dumps(entry) + '\n')

print(f"Data has been converted to JSONL format and saved to {jsonl_file_path}")

def get_chat_completion(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant knowledgeable about the European Union Deforestation Regulation (EUDR)."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150
    )
    return response['choices'][0]['message']['content'].strip()

def interactive_test():
    print("Interactive EUDR Chatbot. Type 'exit' to quit.")
    while True:
        prompt = input("You: ")
        if prompt.lower() == 'exit':
            break
        completion = get_chat_completion(prompt)
        print(f"Bot: {completion}\n")

if __name__ == '__main__':
    interactive_test()