<?php

use Kirby\Cms\AppPluginsTest;

Kirby::plugin('kirby/test1', [
    'hooks' => [
        'system.loadPlugins:after' => function () {
            AppPluginsTest::$calledPluginLoadedHook = true;
        }
    ]
]);
