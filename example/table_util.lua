local M = {}

local TAB = "    "

function M.val_to_str(v, indent)
    if "string" == type(v) then
        v = string.gsub(v, "\n", "\\n")
        if string.match(string.gsub(v, "[^'\"]", ""), '^"+$') then
            return "'" .. v .. "'"
        end
        return '"' .. string.gsub(v, '"', '\\"') .. '"'
    else
        return "table" == type(v) and M.tostring(v, indent) or tostring(v)
    end
end

function M.key_to_str(k)
    if "string" == type(k) and string.match(k, "^[_%a][_%a%d]*$") then
        return k
    else
        return "[" .. M.val_to_str(k) .. "]"
    end
end

function M.tostring(tbl, indent)
    indent = indent or ""
    if "table" ~= type(tbl) then return tostring(tbl) end
    local result, done, keys = {}, {}, {}
    for k, v in ipairs(tbl) do
        table.insert(result, M.val_to_str(v))
        done[k] = true
    end
    for k, _ in pairs(tbl) do
        table.insert(keys, k)
    end
    table.sort(keys)
    for _, k in ipairs(keys) do
        if not done[k] then
            table.insert(result, indent .. TAB .. M.key_to_str(k) .. " = " .. M.val_to_str(tbl[k], indent .. TAB))
        end
    end
    return "{\n" .. table.concat(result, ",\n") .. "\n" .. indent .. "}"
end

return M
