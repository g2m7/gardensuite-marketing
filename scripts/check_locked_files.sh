#!/bin/sh
set -eu

repository_root=$(git rev-parse --show-toplevel)
locked_path='marketing/outreach/sep-2026-pilot/locked/Contacts Verified Golden List.xlsx'
required_hash='6f7de5937d23b88cf6d1a5f78fc9537bd16185ebb6327557cf8e5e931eb6fc0d'

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

printf '%s\n' 'Locked files verified.'
