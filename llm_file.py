import os
import json
import openai

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

# Read and parse the text file
def parse_text_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    data = []
    current_prompt = None
    current_completion = None

    for line in lines:
        line = line.strip()
        if line.startswith("Q:"):
            if current_prompt and current_completion:
                data.append({
                    "prompt": current_prompt,
                    "completion": current_completion
                })
            current_prompt = line[2:].strip()
            current_completion = ""
        elif line.startswith("A:"):
            if current_completion:
                current_completion += " " + line[2:].strip()
            else:
                current_completion = line[2:].strip()
        elif line.startswith("Reference:"):
            if current_completion:
                current_completion += " " + line
            else:
                current_completion = line
        else:
            if current_completion:
                current_completion += " " + line

    # Add the last Q&A pair
    if current_prompt and current_completion:
        data.append({
            "prompt": current_prompt,
            "completion": current_completion
        })

    return data

# Parse the text file
parsed_data = parse_text_file(file_path)

# Convert parsed data to JSONL format and save to file
with open(jsonl_file_path, 'w') as jsonl_file:
    for entry in parsed_data:
        jsonl_file.write(json.dumps(entry) + '\n')

print(f"Data has been converted to JSONL format and saved to {jsonl_file_path}")

# Load the JSONL data
with open("eudr_data.jsonl", "r") as file:
    data = [json.loads(line) for line in file]

def get_chat_completion(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use the appropriate model, such as gpt-3.5-turbo or gpt-4
        messages=[
            {"role": "system", "content": "You are a helpful assistant knowledgeable about the European Union Deforestation Regulation (EUDR)."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=200
    )
    return response['choices'][0]['message']['content'].strip()

# Example usage
for entry in data:
    prompt = entry['prompt']
    completion = get_chat_completion(prompt)
    print(f"Prompt: {prompt}\nCompletion: {completion}\n")