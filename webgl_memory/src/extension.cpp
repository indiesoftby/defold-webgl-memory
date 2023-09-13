
#include <dmsdk/sdk.h>

#if defined(DM_PLATFORM_HTML5)
extern "C"
{
    const char* WebGLMemory_GetInfo();
}

static int GetInfo(lua_State* L)
{
    DM_LUA_STACK_CHECK(L, 1);
    const char *json = WebGLMemory_GetInfo();
    dmScript::JsonToLua(L, json, strlen(json));
    free((void*)json);
    return 1;
}

// Functions exposed to Lua
static const luaL_reg Ext_methods[] = {
    { "get_info", GetInfo },
    /* Sentinel: */
    { NULL, NULL }
};

static void LuaInit(lua_State* L)
{
    int top = lua_gettop(L);

    // Register lua names
    luaL_register(L, "webgl_memory", Ext_methods);

    lua_pop(L, 1);
    assert(top == lua_gettop(L));
}
#endif

static dmExtension::Result InitializeExt(dmExtension::Params* params)
{
#if defined(DM_PLATFORM_HTML5)
    LuaInit(params->m_L);
#endif

    return dmExtension::RESULT_OK;
}

static dmExtension::Result FinalizeExt(dmExtension::Params* params)
{
    return dmExtension::RESULT_OK;
}

DM_DECLARE_EXTENSION(webgl_memory, "webgl_memory", 0, 0, InitializeExt, 0, 0, FinalizeExt)
