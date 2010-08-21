//
//  ToolBarExtension.m
//  Six13
//
//  Created by yyyannag on 8/10/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "NavigationBar.h"


@implementation UIControls(NavigationBar)

- (void)createNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options
{
    CGFloat height   = 39.0f;
    BOOL atTop       = YES;
    UIBarStyle style = UIBarStyleBlackOpaque;
	
    NSDictionary* navigationBarSettings = [settings objectForKey:@"NavigationBarSettings"];
    if (navigationBarSettings) {
        if ([navigationBarSettings objectForKey:@"height"])
            height = [[navigationBarSettings objectForKey:@"height"] floatValue];
        if ([navigationBarSettings objectForKey:@"position"])
            atTop  = [[navigationBarSettings objectForKey:@"position"] isEqualToString:@"top"];
        
#pragma unused(atTop)

    }
	
    CGRect webViewBounds = webView.bounds;
    CGRect navigationBarBounds = CGRectMake(
									  webViewBounds.origin.x,
									  webViewBounds.origin.y,
									  webViewBounds.size.width,
									  height
									  );
    webViewBounds = CGRectMake(
                               webViewBounds.origin.x,
                               webViewBounds.origin.y + height,
                               webViewBounds.size.width,
                               webViewBounds.size.height - height
                               );
    navigationBar = [[UINavigationBar alloc] initWithFrame:navigationBarBounds];
    [navigationBar sizeToFit];
    navigationBar.hidden                 = YES;
    navigationBar.multipleTouchEnabled   = NO;
    navigationBar.autoresizesSubviews    = YES;
    navigationBar.userInteractionEnabled = YES;
    navigationBar.barStyle               = style;
	[[navigationBar topItem] setLeftBarButtonItem:nil];
	
    [navigationBar setFrame:navigationBarBounds];
    [webView setFrame:webViewBounds];
	
    [self.webView.superview addSubview:navigationBar];
}

- (void)setNavigationBarTitle:(NSArray*)arguments withDict:(NSDictionary*)options {
	if (!navigationBar)
		[self createNavigationBar:nil withDict:nil];
		
	if (navigationBar.hidden == YES)
		[self showNavigationBar:nil withDict:nil];
				
	if (!navigationBarItem) {
		navigationBarItem = [[UINavigationItem alloc] init];
		[navigationBar pushNavigationItem:navigationBarItem animated:YES];
	}
	navigationBarItem.title = [arguments objectAtIndex:0];
}

- (void)setNavigationBarLeftButton:(NSArray*)arguments withDict:(NSDictionary*)options {
	if (!navigationBar)
		[self createNavigationBar:nil withDict:nil];

	if (navigationBar.hidden == YES)
		[self showNavigationBar:nil withDict:nil];
		
	NSString* buttonType = [options objectForKey:@"buttonType"];
	
	if (buttonType) {
		if ([buttonType isEqualToString:@"label"]) {
			navigationBarLeftButton = [[UIBarButtonItem alloc] initWithTitle:(NSString *)[options objectForKey:@"label"] style:UIBarButtonItemStyleBordered target:self action:@selector(navigationBarButtonClicked:)];
		}
		if ([buttonType isEqualToString:@"system"]) {
			navigationBarLeftButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:[[options objectForKey:@"buttonId"] intValue] target:nil action:nil];
			navigationBarLeftButton.target = self;
			navigationBarLeftButton.action = @selector(navigationBarButtonClicked:);
		}	
	}
	
	[navigationBarLeftButton setTag:1];

	navigationBarItem.leftBarButtonItem = navigationBarLeftButton;	
	
	if (!navigationBarItem) {
		navigationBarItem = [[UINavigationItem alloc] init];
		[navigationBar pushNavigationItem:navigationBarItem animated:YES];
	}
}

- (void)setNavigationBarRightButton:(NSArray*)arguments withDict:(NSDictionary*)options {
	if (!navigationBar)
		[self createNavigationBar:nil withDict:nil];
	
	if (navigationBar.hidden == YES)
		[self showNavigationBar:nil withDict:nil];
				
	NSString* buttonType = [options objectForKey:@"buttonType"];

	if (buttonType) {
		if ([buttonType isEqualToString:@"label"]) {
			navigationBarRightButton = [[UIBarButtonItem alloc] initWithTitle:(NSString *)[options objectForKey:@"label"] style:0 target:self action:@selector(navigationBarButtonClicked:)];
		}
		if ([buttonType isEqualToString:@"system"]) {
			navigationBarRightButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:[[options objectForKey:@"buttonId"] intValue] target:nil action:nil];
			navigationBarRightButton.target = self;
			navigationBarRightButton.action = @selector(navigationBarButtonClicked:);
		}	
	}
		[navigationBarRightButton setTag:2];

	if (!navigationBarItem) {
		navigationBarItem = [[UINavigationItem alloc] init];
		[navigationBar pushNavigationItem:navigationBarItem animated:YES];
	}

	navigationBarItem.rightBarButtonItem = navigationBarRightButton;
}

- (void)removeNavigationBarRightButton:(NSArray*)arguments withDict:(NSDictionary*)options {
	navigationBarItem.rightBarButtonItem = nil;
}
- (void)removeNavigationBarLeftButton:(NSArray*)arguments withDict:(NSDictionary*)options {
	navigationBarItem.leftBarButtonItem = nil;
}

- (void)hideNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options {
	if (navigationBar.hidden == NO) {
		CGRect webViewBounds = webView.bounds;
		navigationBar.hidden = YES;
		webViewBounds.size.height = webViewBounds.size.height + 24;
		webViewBounds.origin.y = webViewBounds.origin.y - 44;
		[webView setFrame:originalWebViewBounds];
	}
}

- (void)showNavigationBar:(NSArray*)arguments withDict:(NSDictionary*)options {
	if (navigationBar.hidden == YES) {
		CGRect webViewBounds = webView.bounds;
		navigationBar.hidden = NO;
		webViewBounds.size.height = webViewBounds.size.height - 24;
		webViewBounds.origin.y = webViewBounds.origin.y + 44;
		[webView setFrame:webViewBounds];
	}
}

- (void)navigationBarButtonClicked:(UIBarButtonItem *)button {
    NSString* jsCallBack = [NSString stringWithFormat:@"uicontrols.navigationBarButtonClicked(%d);", button.tag];    
    [webView stringByEvaluatingJavaScriptFromString:jsCallBack];
}

@end
