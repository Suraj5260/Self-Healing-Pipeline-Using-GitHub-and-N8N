// 1. Correctly target Gemini's JSON structure
const response = $input.first().json;
const raw = response?.content?.parts?.[0]?.text;

if (!raw) {
    throw new Error('Gemini output is incorrectly formatted or missing.');
}

// 2. Strip Markdown code blocks if Gemini wrapped it in ```json ... ```
const cleaned = raw.replace(/```json|```/g, '').trim();

let parsed;
try {
    parsed = JSON.parse(cleaned);
    if (!parsed.fixed_code) {
        throw new Error('Parsed JSON does not contain fixed_code');
    }
} catch (e) {
    throw new Error('Gemini did not return valid JSON: ' + raw + ' | Error: ' + e.message);
}

// 3. Fetch webhook payload (Ensure this node name matches exactly!)
const payload = $('Github Failure Webhook').first().json.body;

// 4. Return mapped outputs, providing safe fallbacks for missing properties
return {
    branch_name: parsed.branch_name,
    file_path: parsed.file_path,
    fixed_code: parsed.fixed_code,
    base64_content: Buffer.from(parsed.fixed_code).toString('base64'),
    pr_title: parsed.pr_title,
    pr_body: parsed.pr_body,
    repo: payload.repo,
    commit: payload.commit
};