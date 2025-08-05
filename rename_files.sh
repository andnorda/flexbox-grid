#!/bin/bash

# Check for argument
if [ -z "$1" ]; then
  echo "Usage: $0 <starting_number>"
  exit 1
fi

start=$1

# Find all matching files and extract numbers
# Format: [filename] [number] [fullmatch]
matches=()
while IFS= read -r file; do
  if [[ "$file" =~ ([0-9]+) ]]; then
    num=${BASH_REMATCH[1]}
    if (( num >= start )); then
      matches+=("$num|$file")
    fi
  fi
done < <(find . -maxdepth 1 -type f -name "*[0-9]*.html" | sort)

# Sort in **reverse order** to avoid overwriting
IFS=$'\n' sorted=($(printf '%s\n' "${matches[@]}" | sort -r -n))

for entry in "${sorted[@]}"; do
  num="${entry%%|*}"
  file="${entry#*|}"

  new_num=$((num + 1))
  new_file="${file/$num/$new_num}"

  echo "Renaming: $file -> $new_file"
  mv "$file" "$new_file"
done
