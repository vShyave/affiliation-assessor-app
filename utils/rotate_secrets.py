import os
import argparse

def rotate_secret(env_file_path: str, variables: list[str]):
    # Open the specified .env file in read mode
    with open(env_file_path, 'r') as f:
        env_lines = f.readlines()
    
    # Iterate over each line in the .env file
    for i in range(len(env_lines)):
        env_line = env_lines[i].strip()
        
        # Check if the line is not a comment and contains a variable and a value
        if not env_line.startswith('#') and '=' in env_line:
            env_var, env_val = env_line.split('=', 1)
            
            # Check if the variable is in the list of variables to be rotated
            if env_var in variables:
                # Replace the value of the variable with a new random value
                env_val = os.urandom(16).hex() # replace with your preferred method of generating new secrets
                env_lines[i] = f"{env_var}={env_val}\n"
    
    # Write the updated lines back to the .env file
    with open(env_file_path, 'w') as f:
        f.writelines(env_lines)

if __name__ == '__main__':
    # Define the command-line arguments
    parser = argparse.ArgumentParser(description='Rotate secrets in a .env file')
    parser.add_argument('env_file', type=str, help='Path to .env file')
    parser.add_argument('--variables', type=str, nargs='+', help='List of variables to rotate secrets for')
    
    # Parse the command-line arguments
    args = parser.parse_args()
    
    # Call the rotate_secret function with the specified arguments
    rotate_secret(args.env_file, args.variables)
