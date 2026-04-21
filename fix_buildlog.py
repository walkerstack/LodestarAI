with open('client/src/pages/Home.tsx', 'r') as f:
    lines = f.readlines()

# Lines 1924-2100 (0-indexed: 1923-2099) contain the entries div + closing section
# Replace with clean teaser image + closing section

TEASER = '''          <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid #2a1e10' }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663536092940/k6tj495B6E7cV6HReyNZzD/builders-log-teaser-SnNNAHKtzxVNf6aegb7S89.webp"
              alt="Builder's Log — field journal open on a dark desk with lantern light, buffalo and sloth sketches, AI diagrams"
              className="w-full object-cover"
              style={{ maxHeight: '340px', objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>
'''

# entries div starts at line 1924 (0-indexed: 1923)
# closing section is at line 2100 (0-indexed: 2099)
new_lines = lines[:1923] + [TEASER] + lines[2100:]

with open('client/src/pages/Home.tsx', 'w') as f:
    f.writelines(new_lines)

print("Done. Lines 1924-2100 replaced with image teaser.")
print(f"New file length: {len(new_lines)} lines")
