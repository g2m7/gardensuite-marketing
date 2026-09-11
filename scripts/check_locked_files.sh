#!/bin/sh
set -eu

repository_root=$(git rev-parse --show-toplevel)

check_locked_file() {
  locked_path="$1"
  required_hash="$2"

  reject_locked_file_change() {
    printf '%s\n' "Commit rejected: $locked_path is a permanent source record and must not be modified, replaced, renamed, moved, or deleted." >&2
    exit 1
  }

  if ! git cat-file -e ":$locked_path" 2>/dev/null; then
    reject_locked_file_change
  fi

  staged_hash=$(git show ":$locked_path" | shasum -a 256 | awk '{print $1}')
  if [ "$staged_hash" != "$required_hash" ]; then
    reject_locked_file_change
  fi

  if [ ! -f "$repository_root/$locked_path" ]; then
    reject_locked_file_change
  fi

  working_hash=$(shasum -a 256 "$repository_root/$locked_path" | awk '{print $1}')
  if [ "$working_hash" != "$required_hash" ]; then
    reject_locked_file_change
  fi
}

check_locked_file 'marketing/outreach/sep-2026-pilot/locked/Contacts Verified Golden List.xlsx' 'fd2b375953d5671d6453d9047453452bd3706541e6fdad302c2e77e388afbef6'
check_locked_file "marketing/outreach/sep-2026-pilot/locked/Email Id's .xlsx" '44e1ddc36815b6e14a874c677d2caf36d96f8866530d17cdb4229829c1ba80fb'

printf '%s\n' 'Locked files verified.'
