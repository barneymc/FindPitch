//
//  ToolBarExtension.h
//  Six13
//
//  Created by yyyannag on 8/10/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UIControls.h"

@interface UIControls(NavigationBar)

UINavigationBar* navigationBar;
NSMutableDictionary* navigtaionBarItems;
UIBarButtonItem* navigationBarLeftButton;
UIBarButtonItem* navigationBarRightButton;
UINavigationItem* navigationBarItem;

- (void)createNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)setNavigationBarTitle:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)setNavigationBarLeftButton:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)setNavigationBarRightButton:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)removeNavigationBarRightButton:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)removeNavigationBarLeftButton:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)hideNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options;
- (void)showNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options;
@end
